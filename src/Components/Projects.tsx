import React from 'react';
import { Container, Typography, Pagination, Grid } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';
import { useTheme } from '@mui/material/styles';
import SectionTitle from './SectionTitle';
import project_list from '../resources/projects';
import Project from './Project';

const ProjectWrapper = (props: { project: any }) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Project
        {...props.project}
      />
    </Grid>
  );
}

const Projects = () => {
  let theme = useTheme();
  return (
    <Container
      maxWidth="lg"
      id="projects"
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionTitle title="Personal Projects" />
        </Grid>
        {project_list.map((project, i) => <ProjectWrapper key={i} project={project} />)}
      </Grid>
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        More projects to be added soon!
      </Typography>
    </Container>
  );
}

export default Projects;