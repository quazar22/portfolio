import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Box,
    Typography,
    Paper,
    Divider,
    Link as MuiLink
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogType } from '../Models/Project';
import { client, urlFor } from './Projects';
import hexToRgbA from '../utils/hexToRgba';
import theme from '../theme';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Page } from './ResponsiveAppBar';
import { ChipMaker, ExperienceChips } from '../utils/ChipMaker';
import { groupListItems } from '../utils/groupListItems';

// Helper: Slugify text for IDs.
const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const Blog = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);
    const navigate = useNavigate();
    const { blogId } = useParams<{ blogId: string }>();

    // Fetch blog entries when component mounts.
    useEffect(() => {
        const getBlogs = async () => {
            try {
                const query = `*[_type == "blogType"] | order(publishedAt desc)`;
                const data = await client.fetch<BlogType[]>(query);
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        getBlogs();
    }, []);

    // Set selected blog based on URL or default to first blog.
    useEffect(() => {
        if (blogs.length > 0) {
            if (blogId) {
                const found = blogs.find((p) => p._id === blogId);
                setSelectedBlog(found || blogs[0]);
            } else {
                setSelectedBlog(blogs[0]);
                navigate(`/blog/${blogs[0]._id}`, { replace: true });
            }
        }
    }, [blogId, blogs, navigate]);

    // Update the URL when a blog is clicked.
    const handleBlogClick = (blog: BlogType) => {
        setSelectedBlog(blog);
        navigate(`/blog/${blog._id}`);
    };

    // Helper: Get thumbnail image from a blog.
    const getThumbnailUrl = (blog: BlogType): string | null => {
        if (!blog.body) return null;
        const firstImageBlock = blog.body.find(
            (block) => block._type === 'projectImage' && block.asset?._ref
        ) as any;
        if (firstImageBlock && firstImageBlock.asset?._ref) {
            return urlFor(firstImageBlock.asset._ref).url();
        }
        return null;
    };

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
                        <code
                            style={{
                                backgroundColor: hexToRgbA(theme.palette.primary.main, 0.1),
                                padding: '2px 4px',
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                            }}
                        >
                            {node}
                        </code>
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
     * Renders a single Sanity block (text with inline marks, list items, etc.)
     * For heading blocks (h2 and h3), an id is added for linking.
     */
    const renderBlock = (block: any, index: number) => {
        const childrenNodes = block.children?.map((child: any, i: number) => (
            <React.Fragment key={child._key || i}>
                {parseSpanChild(child, block.markDefs)}
            </React.Fragment>
        ));
        // If block is a heading (h2 or h3), add an id.
        const headingId =
            (block.style === 'h2' || block.style === 'h3') && childrenNodes
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

    // Generate the Table of Contents (TOC) from heading blocks (h2 and h3).
    const generateTOC = () => {
        if (!selectedBlog || !selectedBlog.body) return [];
        return selectedBlog.body
            .filter(
                (block) =>
                    block._type === 'block' && (block.style === 'h2' || block.style === 'h3')
            )
            .map((block: any) => {
                const text = block.children?.map((child: any) => child.text).join(' ') || '';
                const id = slugify(text);
                return { text, id, level: block.style };
            });
    };

    const tocItems = generateTOC();

    // Render the Table of Contents.
    const renderTOC = () => {
        if (tocItems.length === 0) return null;
        return (
            <Box sx={{ p: 2, position: 'sticky', top: '80px' }}>
                <Typography variant="h6" gutterBottom>
                    Contents
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
                    {tocItems.map((item, idx) => (
                        <li key={idx}>
                            <MuiLink
                                href={`#${item.id}`}
                                underline="hover"
                                sx={{
                                    ml: item.level === 'h3' ? 2 : 0,
                                    color: theme.palette.primary.main,
                                    cursor: 'pointer',
                                }}
                            >
                                {item.text}
                            </MuiLink>
                        </li>
                    ))}
                </Box>
            </Box>
        );
    };

    // Render the entire blog body with grouped list items.
    const renderBlogDetails = () => {
        if (!selectedBlog)
            return <Typography variant="h6">Select a blog entry</Typography>;

        const groupedBlocks = groupListItems(selectedBlog.body || []);

        return (
            <Box p={2}>
                <Typography variant="h2" gutterBottom>
                    {selectedBlog.title}
                </Typography>
                {selectedBlog.publishedAt && (
                    <Typography variant="subtitle2" gutterBottom>
                        {new Date(selectedBlog.publishedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Typography>
                )}
                <Divider sx={{ bgcolor: theme.palette.primary.main, marginBottom: 4 }} />
                {selectedBlog.summary && (
                    <Typography variant="body1" gutterBottom>
                        {selectedBlog.summary}
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
                                    alt={block.alt || selectedBlog.title}
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

    // Render the sidebar blog list.
    const renderBlogList = () => {
        return (
            <Box>
                <Typography variant="h6" gutterBottom>
                    Blog Entries
                </Typography>
                {blogs.map((blog) => {
                    const thumb = getThumbnailUrl(blog);
                    const isSelected = selectedBlog?._id === blog._id;
                    return (
                        <Box
                            key={blog._id}
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
                            onClick={() => handleBlogClick(blog)}
                        >
                            {thumb && (
                                <Box
                                    component="img"
                                    src={thumb}
                                    alt={blog.title}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        mr: 1,
                                    }}
                                />
                            )}
                            <Box>
                                <Typography variant="body1">{blog.title}</Typography>
                                {blog.publishedAt && (
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ color: hexToRgbA(theme.palette.text.primary, 0.5) }}
                                    >
                                        {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const pages: Page[] = [
        { title: 'About Me', redirect: '/#aboutme' },
        { title: 'Experience', redirect: '/#experience' },
        { title: 'Projects', redirect: '/projects' },
        { title: 'Contact', redirect: '/#contact' },
        { title: 'Blog' }
    ];

    return (
        <>
            <ResponsiveAppBar pages={pages} currentSection="" hideOnScroll={false} />
            <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
                <Grid container spacing={2}>
                    {/* TOC column (left) */}
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
                    {/* Detail view (center) */}
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
                            {renderBlogDetails()}
                        </Paper>
                    </Grid>
                    {/* Sidebar blog list (right) */}
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
                            {renderBlogList()}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Blog;
