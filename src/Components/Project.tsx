import React from 'react';
import { Typography, Grid, Box, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import InfoIcon from '@mui/icons-material/Info';
import theme from '../theme';
import hexToRgbA from '../utils/hexToRgba';
import { ProjectImage, ProjectType } from '../Models/Project';
import { urlFor } from './Projects';
import { ChipMaker, ExperienceChips } from '../utils/ChipMaker';
import { useNavigate } from 'react-router-dom';

const Project = (props: { project: ProjectType }) => {
    // Helper to find the first image block in the project body.
    const getFirstImageUrl = (): string | null => {
        if (!props.project.body) return null;
        const firstImageBlock: ProjectImage = props.project.body.find(
            (block) => block._type === 'projectImage' && block.asset?._ref
        ) as ProjectImage;
        if (firstImageBlock && firstImageBlock.asset?._ref) {
            return urlFor(firstImageBlock.asset._ref).url();
        }
        return null;
    };

    const firstImageUrl = getFirstImageUrl();
    const navigate = useNavigate();

    return (
        <Grid
            container
            p={2}
            alignItems="center"
            sx={{
                transition: 'all 0.2s ease-in-out',
                borderRadius: 2,
                minHeight: '100%',
                border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.05),
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.05),
                    backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.1),
                },
            }}
        >
            {/* Project Title */}
            <Grid item xs={12}>
                <Typography variant="h5" textAlign="center">
                    {props.project.title}
                </Typography>
            </Grid>

            {/* First Image */}
            {firstImageUrl && (
                <Grid item xs={12} my={2}>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={firstImageUrl}
                            alt={props.project.title}
                            onClick={() => {
                                navigate(`/projects/${props.project._id}`);
                            }}
                            style={{
                                borderRadius: 4,
                                border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.2),
                                maxWidth: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                </Grid>
            )}

            {/* Project Summary / Description */}
            {props.project.summary && (
                <Grid item xs={12}>
                    <Typography variant="body2" textAlign="left">
                        {props.project.summary}
                    </Typography>
                </Grid>
            )}

            {/* GitHub Link */}
            {props.project.github_link && (
                <Grid item xs={12} mt={1}>
                    <Link
                        href={props.project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.primary.main,
                        }}
                    >
                        <GitHubIcon />
                        <Typography variant="body2" ml={1}>
                            Check it out on GitHub!
                        </Typography>
                    </Link>
                </Grid>
            )}

            {/* Deployed Link */}
            {props.project.deployment_link && (
                <Grid item xs={12} mt={1}>
                    <Link
                        href={props.project.deployment_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.primary.main,
                        }}
                    >
                        <WebIcon />
                        <Typography variant="body2" ml={1}>
                            Check out a deployed version of {props.project.title} here!
                        </Typography>
                    </Link>
                </Grid>
            )}

            {/* Info Link */}
            {props.project.info_link && (
                <Grid item xs={12} mt={1}>
                    <Link
                        href={props.project.info_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.palette.primary.main,
                        }}
                    >
                        <InfoIcon />
                        <Typography variant="body2" ml={1}>
                            Check out further information here!
                        </Typography>
                    </Link>
                </Grid>
            )}

            {/* Experience Tags / Chips */}
            <Grid item xs={12} mt={2}>
                {props.project.experience_tags &&
                    <ExperienceChips>
                        <ChipMaker chips={[...props.project.experience_tags]} />
                    </ExperienceChips>}
            </Grid>
        </Grid>
    );
};

export default Project;
