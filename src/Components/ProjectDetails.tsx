import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import theme from '../theme';
import hexToRgbA from '../utils/hexToRgba';
import { ProjectType } from '../Models/Project';
import { urlFor } from './Projects';
import { useParams } from 'react-router-dom';
import { client } from './Projects';
import { ChipMaker, ExperienceChips } from '../utils/ChipMaker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
        >
            <IconButton>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="body1" color="primary">
                Back to Home
            </Typography>
        </Box>
    );
};

const ProjectDetails = () => {
    const params = useParams();
    const projectId = params.id;

    const [project, setProject] = useState<ProjectType | null>(null);

    useEffect(() => {
        const getProject = async () => {
            try {
                const query = `*[_type == "project" && _id == "${projectId}"]`;
                const data = await client.fetch<ProjectType[]>(query);
                if (data && data.length > 0) {
                    setProject(data[0]);
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (projectId) {
            getProject();
        }
    }, [projectId]);

    // Render the content blocks in order
    const renderContent = () => {
        if (!project || !project.body) return null;
        return project.body.map((block, index) => {
            // Text block
            if (block._type === 'block') {
                const text = block.children?.map((child: any) => child.text).join('') || '';
                // Use block.style if available, otherwise default to body1.
                const variant: any = block.style && block.style !== 'normal' ? block.style : 'body1';
                return (
                    <Typography key={block._key || index} variant={variant} paragraph>
                        {text}
                    </Typography>
                );
            }
            // Image block
            else if (block._type === 'projectImage') {
                const assetRef = block.asset?._ref;
                if (!assetRef) return null;
                const imageUrl = urlFor(assetRef).url();
                return (
                    <Box key={block._key || index} my={2} textAlign="center">
                        <img
                            src={imageUrl}
                            alt={block.alt || project.title}
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
        });
    };

    if (!project) {
        return <Typography variant="h6" align="center" mt={4}>Loading...</Typography>;
    }

    return (
        <>
            <Grid
                container
                spacing={3}
                p={3}
                sx={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.05),
                    borderRadius: 2,
                    backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.1),
                }}
            >
                <BackButton />

                {/* Project Title */}
                <Grid item xs={12} >
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        {project.title}
                    </Typography>
                </Grid>

                {/* Experience Tags */}
                <Grid item xs={12}>
                    <ExperienceChips>
                        <ChipMaker chips={project.experience_tags} />
                    </ExperienceChips>
                </Grid>

                {/* Project Summary */}
                {project.summary && (
                    <Grid item xs={12}>
                        <Typography variant="body1" textAlign="left">
                            {project.summary}
                        </Typography>
                    </Grid>
                )}

                {/* Project Body Content */}
                <Grid item xs={12}>
                    {renderContent()}
                </Grid>

                {/* Optional Links */}
                {project.github_link && (
                    <Grid item xs={12}>
                        <Link
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                mb: 1,
                            }}
                        >
                            <GitHubIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">
                                Check out the project here on GitHub!
                            </Typography>
                        </Link>
                    </Grid>
                )}

                {project.deployment_link && (
                    <Grid item xs={12}>
                        <Link
                            href={project.deployment_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                mb: 1,
                            }}
                        >
                            <WebIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">
                                Check out a deployed version here!
                            </Typography>
                        </Link>
                    </Grid>
                )}

                {project.info_link && (
                    <Grid item xs={12}>
                        <Link
                            href={project.info_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                mb: 1,
                            }}
                        >
                            <Typography variant="body1">
                                Check out further information here!
                            </Typography>
                        </Link>
                    </Grid>
                )}


            </Grid>
        </>

    );
};

export default ProjectDetails;
