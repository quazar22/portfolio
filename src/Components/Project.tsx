import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Chip, Link } from '@mui/material';
import { ChipMaker, ExperienceChips } from '../utils/ChipMaker';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import theme from '../theme';
import hexToRgbA from '../utils/hexToRgba';
import { ProjectType } from '../Models/Project';
import { ImageData, ImageType } from '../Models/Image';

const Project = (props: {
  project: ProjectType
}) => {
  const image_link_base = process.env.REACT_APP_API_URL + '/api/files';
  const [imageLinks, setImageLinks] = useState([] as string[]);

  useEffect(() => {
    const getImageLinks = async () => {
      const api_endpoint = process.env.REACT_APP_API_URL + '/projects/pid/' + props.project.id + '/images';
      const response = await fetch(api_endpoint);
      const data = await response.json();
      let image_links: string[] = [] as string[];
      if (!data.data || data.data.length === 0) {
        return;
      }
      let image_data = data.data as ImageData;
      for (let image of image_data.images) {
        let image_url = image_data.endpoint + `/api/files/${image.collectionId}/${image.id}/${image.image}`;
        image_links.push(image_url);
      }
      setImageLinks(image_links);
      console.log(data);
    }
    getImageLinks();
  }, []);

  return (
    <Grid container p={2}
      alignItems={"start"}
      sx={{
        transition: "all 0.2s ease-in-out",
        borderRadius: 2,
        minHeight: "100%",
        border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.05),
        '&:hover': {
          transform: "scale(1.02)",
          boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.05),
          backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.1),
        }
      }}
    >
      <Grid item container xs={12}
        sx={{

        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" textAlign={"center"}>{props.project.title}</Typography>
        </Grid>
        <Grid item container xs={12} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            {
            imageLinks.length > 0 &&
            <Box sx={{
              height: "100%",
              width: "100%",
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={imageLinks[0]}
                style={{
                  borderRadius: 4,
                  border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.2),
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Box>}
          </Grid>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Typography variant="body2" textAlign={"left"}>{props.project.description}</Typography>
        </Grid>
        {
          props.project.links &&
          props.project.links.map((link, i) => {
            return (
              <Grid item container xs={12} alignItems="center" key={i}>
                <Grid item>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                    {link.is_github ? <GitHubIcon /> : <WebIcon />}
                    <Typography variant="body2" component="span" textAlign={"left"} ml={1}>
                      {link.is_github ? `Check out ${link.title} on Github` : `Check out a deployed version of ${link.title}`}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            )
          })
        }
        <Grid item container xs={12} justifyContent={"center"}>
          <ExperienceChips>
            <ChipMaker chips={props.project.experience_chips} />
          </ExperienceChips>
        </Grid>
      </Grid>
    </Grid >
  );
}

export default Project;