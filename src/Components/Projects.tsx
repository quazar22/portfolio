import React, { useEffect, useState } from 'react';
import { Container, Typography, Pagination, Grid } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';
import { useTheme } from '@mui/material/styles';
import SectionTitle from './SectionTitle';
import project_list from '../resources/projects';
import { getApiUrl, getCDN } from '../utils/url';
import { ProjectType } from '../Models/Project';
import Project from './Project';
import StyledButton from './StyledButton';
import hexToRgbA from '../utils/hexToRgba';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const ProjectWrapper = (props: { project: ProjectType }) => {
    return (
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Project
                project={props.project}
            />
        </Grid>
    );
}

interface ProjectsProps {
    onLoad?: () => void;
}

export const client = createClient({
    projectId: 'tki5mjz8',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-03-20'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

const Projects: React.FC<ProjectsProps> = ({ onLoad }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectType[]>([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const query = '*[_type == "projectType"] | order(publishedAt desc)[0...6]';
                const data = await client.fetch<ProjectType[]>(query);
                setProjects(data);
                // Notify parent that the projects are loaded.
                if (onLoad) onLoad();
            } catch (error) {
                console.log(error);
            }
        };
        getProjects();
    }, [onLoad]);

    return (
        <Container maxWidth="lg" id="projects">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <SectionTitle title="Personal Projects" />
                </Grid>
                {projects.map((project, i) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                        <Project project={project} />
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <StyledButton
                    sx={{
                        outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.3),
                        '&:hover': {
                            outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.5),
                            backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
                        },
                    }}
                    onClick={() => {
                        navigate('/projects');
                    }}
                >
                    See More Projects
                </StyledButton>
            </Grid>
        </Container>
    );
};

export default Projects;