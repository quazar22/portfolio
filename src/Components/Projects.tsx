import React, { useEffect, useState } from 'react';
import { Container, Typography, Pagination, Grid } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';
import { useTheme } from '@mui/material/styles';
import SectionTitle from './SectionTitle';
import project_list from '../resources/projects';
import { getApiUrl } from '../utils/url';
import { ProjectType } from '../Models/Project';
import Project from './Project';
import StyledButton from './StyledButton';
import hexToRgbA from '../utils/hexToRgba';
import { useNavigate } from 'react-router-dom';

const ProjectWrapper = (props: { project: any }) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Project
        project={props.project}
      />
    </Grid>
  );
}

const Projects = () => {
  let theme = useTheme();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([] as ProjectType[]);

  useEffect(() => {
    const getProjects = async () => {
      console.log(process.env.REACT_APP_API_URL);
      const api_endpoint = getApiUrl() + '/projects';
      const response = await fetch(api_endpoint);
      const data = await response.json();
      let projects_list: ProjectType[] = [] as ProjectType[];
      if (!data.data || data.data.length === 0) {
        return;
      }
      for (let project of data.data) {
        projects_list.push(project);
      }
      setProjects(projects_list);
      console.log(data);
    }
    // const getImageLinks = async () => {
    //   const api_endpoint = getApiUrl() + '/projects/images';
    //   const response = await fetch(api_endpoint);
    //   const data = await response.json();
    //   let image_links: string[] = [] as string[];
    //   if (!data.data || data.data.length === 0) {
    //     return;
    //   }
    //   for (let image of data.data) {
    //     image_links.push(image);
    //   }
    //   setImageLinks(image_links);
    //   console.log(data);
    // }
    getProjects();
    // getImageLinks();
  }, []);

  return (
    <Container
      maxWidth="lg"
      id="projects"
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionTitle title="Personal Projects" />
        </Grid>
        {projects.map((project, i) => <ProjectWrapper key={i} project={project} />)}
        {/* {project_list.map((project, i) => <ProjectWrapper key={i} project={project} />)} */}
      </Grid>
      {/* <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        More projects to be added soon!
      </Typography> */}
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <StyledButton
          sx={{
            outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.3),
            '&:hover': {
              outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, .5),
              backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
              // boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.3),
            }
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
}

export default Projects;