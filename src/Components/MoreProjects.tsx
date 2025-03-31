import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Paper, Divider, Link as MuiLink, List, ListItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectType } from '../Models/Project';
import { client, urlFor } from './Projects';
import hexToRgbA from '../utils/hexToRgba';
import theme from '../theme';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Page } from './ResponsiveAppBar';
import { ChipMaker, ExperienceChips } from '../utils/ChipMaker';
import { groupListItems } from '../utils/groupListItems';
import { CopyBlock, a11yDark as dark } from 'react-code-blocks';

// A simple helper to slugify text.
const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const MoreProjects = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();

    // Fetch projects when component mounts.
    useEffect(() => {
        const getProjects = async () => {
            try {
                const query = `*[_type == "projectType"] | order(publishedAt desc)`;
                const data = await client.fetch<ProjectType[]>(query);
                setProjects(data);
            } catch (error) {
                console.error(error);
            }
        };
        getProjects();
    }, []);

    // Set selected project based on URL or default to first project.
    useEffect(() => {
        if (projects.length > 0) {
            if (projectId) {
                const found = projects.find((p) => p._id === projectId);
                setSelectedProject(found || projects[0]);
            } else {
                setSelectedProject(projects[0]);
                navigate(`/projects/${projects[0]._id}`, { replace: true });
            }
        }
    }, [projectId, projects, navigate]);

    // Update the URL when a project is clicked.
    const handleProjectClick = (project: ProjectType) => {
        setSelectedProject(project);
        navigate(`/projects/${project._id}`);
    };

    // Helper: Get thumbnail image from a project.
    const getThumbnailUrl = (project: ProjectType): string | null => {
        if (!project.body) return null;
        const firstImageBlock = project.body.find(
            (block) => block._type === 'projectImage' && block.asset?._ref
        ) as any;
        if (firstImageBlock && firstImageBlock.asset?._ref) {
            return urlFor(firstImageBlock.asset._ref).url();
        }
        return null;
    };

    function useLaggingOffset(lag = 0.1) {
        const [scrollY, setScrollY] = useState(window.scrollY);
        const [lagOffset, setLagOffset] = useState(window.scrollY);

        useEffect(() => {
            const handleScroll = () => {
                const current = window.scrollY;
                setScrollY(current);
                // Move lagOffset a fraction closer to current scroll value.
                setLagOffset(prev => prev + (current - prev) * lag);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [lag]);

        return { scrollY, lagOffset };
    }

    /**
     * parseSpanChild
     * Wraps each child's text with its inline marks (strong, em, underline, code, link, etc.)
     */
    const parseSpanChild = (child: any, markDefs?: any[]) => {
        let node: React.ReactNode = child.text;
        if (child.marks && child.marks.length > 0) {
            child.marks.forEach((mark: string) => {
                if (mark === 'strong') {
                    node = <strong>{node}</strong>;
                } else if (mark === 'em') {
                    node = <em>{node}</em>;
                } else if (mark === 'underline') {
                    node = <u>{node}</u>;
                } else if (mark === 'code') {
                    node = (
                        <CopyBlock
                            text={node as string}
                            language=""
                            showLineNumbers={false}
                            theme={dark}
                            codeBlock
                        />
                    );
                } else {
                    const linkDef = markDefs?.find(
                        (def: any) => def._key === mark && def._type === 'link'
                    );
                    if (linkDef && linkDef.href) {
                        node = (
                            <a
                                href={linkDef.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: theme.palette.primary.main }}
                            >
                                {node}
                            </a>
                        );
                    }
                }
            });
        }
        return node;
    };

    /**
     * renderBlock
     * Renders a single text block with inline marks.
     * For heading blocks (h2/h3) we assign an id attribute for linking.
     */
    const renderBlock = (block: any, index: number) => {
        const childrenNodes = block.children?.map((child: any, i: number) => (
            <React.Fragment key={child._key || i}>
                {parseSpanChild(child, block.markDefs)}
            </React.Fragment>
        ));
        // For headings, add an id attribute.
        const headingId =
            (block.style === 'h2' || block.style === 'h3' || block.style === 'h4') && childrenNodes
                ? slugify(
                    (block.children as any)
                        .map((child: any) => child.text)
                        .join(' ')
                )
                : undefined;
        const commonProps = { id: headingId, key: block._key || index, paragraph: true };
        switch (block.style) {
            case 'blockquote':
                return (
                    <Typography
                        {...commonProps}
                        variant="body1"
                        component="blockquote"
                        sx={{
                            borderLeft: '4px solid #ccc',
                            pl: 2,
                            fontStyle: 'italic',
                            color: theme.palette.text.secondary,
                        }}
                    >
                        {childrenNodes}
                    </Typography>
                );
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                return (
                    <Typography {...commonProps} variant={block.style}>
                        {childrenNodes}
                    </Typography>
                );
            case 'normal':
            default:
                return (
                    <Typography {...commonProps} variant="body1">
                        {childrenNodes}
                    </Typography>
                );
        }
    };

    // Generate Table of Contents (TOC) items from heading blocks (h2 and h3).
    const generateTOC = () => {
        if (!selectedProject || !selectedProject.body) return [];
        return selectedProject.body
            .filter((block) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3' || block.style === 'h4'))
            .map((block: any) => {
                const text = block.children?.map((child: any) => child.text).join(' ') || '';
                const id = slugify(text);
                return { text, id, level: block.style }; // level can be used for styling (indentation, etc.)
            });
    };

    const tocItems = generateTOC();

    // Render the project details with grouped list items.
    const renderProjectDetails = () => {
        if (!selectedProject)
            return <Typography variant="h6">Select a project</Typography>;

        const groupedBlocks = groupListItems(selectedProject.body || []);

        return (
            <Box p={2}>
                <Typography variant="h4" gutterBottom>
                    {selectedProject.title}
                </Typography>
                <Box m={2}>
                    {selectedProject.experience_tags && (
                        <ExperienceChips>
                            <ChipMaker chips={[...selectedProject.experience_tags]} />
                        </ExperienceChips>
                    )}
                </Box>
                {selectedProject.summary && (
                    <Typography variant="body1" gutterBottom>
                        {selectedProject.summary}
                    </Typography>
                )}
                {groupedBlocks.map((block: any, index: number) => {
                    // Render grouped lists.
                    if (block._type === 'list') {
                        if (block.listType === 'bullet') {
                            return (
                                <ul key={index} style={{ marginLeft: '1.5rem' }}>
                                    {block.items.map((item: any, idx: number) => {
                                        const childrenNodes = item.children?.map((child: any, i: number) => (
                                            <React.Fragment key={child._key || i}>
                                                {parseSpanChild(child, item.markDefs)}
                                            </React.Fragment>
                                        ));
                                        return <li key={item._key || idx}>{childrenNodes}</li>;
                                    })}
                                </ul>
                            );
                        } else {
                            return (
                                <ol key={index} style={{ marginLeft: '1.5rem' }}>
                                    {block.items.map((item: any, idx: number) => {
                                        const childrenNodes = item.children?.map((child: any, i: number) => (
                                            <React.Fragment key={child._key || i}>
                                                {parseSpanChild(child, item.markDefs)}
                                            </React.Fragment>
                                        ));
                                        return <li key={item._key || idx}>{childrenNodes}</li>;
                                    })}
                                </ol>
                            );
                        }
                    }
                    // Render a normal text block.
                    if (block._type === 'block') {
                        return renderBlock(block, index);
                    }
                    // Render an image block.
                    if (block._type === 'projectImage') {
                        const assetRef = block.asset?._ref;
                        if (!assetRef) return null;
                        const imageUrl = urlFor(assetRef).url();
                        return (
                            <Box key={block._key || index} my={2} textAlign="center">
                                <img
                                    src={imageUrl}
                                    alt={block.alt || selectedProject.title}
                                    style={{
                                        borderRadius: 4,
                                        border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.2),
                                        maxWidth: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                    }}
                                />
                                {block.caption && (
                                    <Typography variant="caption" display="block">
                                        {block.caption}
                                    </Typography>
                                )}
                            </Box>
                        );
                    }
                    return null;
                })}
            </Box>
        );
    };

    // Render the sidebar project list.
    const renderProjectList = () => {
        return (
            <Box>
                <Typography variant="h6" gutterBottom>
                    Projects
                </Typography>
                {projects.map((project) => {
                    const thumb = getThumbnailUrl(project);
                    const isSelected = selectedProject?._id === project._id;
                    return (
                        <Box
                            key={project._id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                my: 1,
                                cursor: 'pointer',
                                backgroundColor: isSelected
                                    ? hexToRgbA(theme.palette.primary.main, 0.1)
                                    : 'transparent',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: hexToRgbA(theme.palette.primary.main, 0.15),
                                },
                            }}
                            onClick={() => handleProjectClick(project)}
                        >
                            {thumb && (
                                <Box
                                    component="img"
                                    src={thumb}
                                    alt={project.title}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        mr: 1,
                                    }}
                                />
                            )}
                            <Typography variant="body1">{project.title}</Typography>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const renderTOC = () => {
        if (tocItems.length === 0) return null;
        return (
          <Box sx={{ p: 2, position: 'sticky', top: '80px' }}>
            <Typography variant="h6" gutterBottom>
              Contents
            </Typography>
            <List disablePadding>
              {tocItems.map((item, idx) => (
                <ListItem
                  key={idx}
                  disableGutters
                  sx={{
                    pl:
                      item.level === 'h2'
                        ? 1
                        : item.level === 'h3'
                        ? 3
                        : item.level === 'h4'
                        ? 5
                        : 0,
                    mb: 0.5,
                  }}
                >
                  <MuiLink
                    href={`#${item.id}`}
                    underline="hover"
                    sx={{
                      fontSize:
                        item.level === 'h2'
                          ? '1.4rem'
                          : item.level === 'h3'
                          ? '1.2rem'
                          : item.level === 'h4'
                          ? '1rem'
                          : '1rem',
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                    }}
                  >
                    {item.text}
                  </MuiLink>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      };

    const pages: Page[] = [
        { title: 'About Me', redirect: '/#aboutme' },
        { title: 'Experience', redirect: '/#experience' },
        { title: 'Projects' },
        { title: 'Contact', redirect: '/#contact' },
        { title: 'Blog', redirect: '/blog' }
    ];

    return (
        <>
            <ResponsiveAppBar pages={pages} currentSection="" hideOnScroll={false} />
            <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
                <Grid container spacing={2}>
                    {/* Table of Contents (left column) */}
                    <Grid item xs={12} md={2}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                height: '100%',
                                borderRadius: 2,
                                backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.05),
                            }}
                        >
                            {renderTOC()}
                        </Paper>
                    </Grid>
                    {/* Detail view (center column) */}
                    <Grid item xs={12} md={7.5}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                minHeight: '80vh',
                                borderRadius: 2,
                                backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.1),
                            }}
                        >
                            {renderProjectDetails()}
                        </Paper>
                    </Grid>
                    {/* Sidebar project list (right column) */}
                    <Grid item xs={12} md={2.5}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                borderRadius: 2,
                            }}
                        >
                            {renderProjectList()}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default MoreProjects;
