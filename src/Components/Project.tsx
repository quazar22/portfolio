import React from 'react';
import { Container, Typography, Grid, Box, Chip, Link } from '@mui/material';
import { ChipMaker, ExperienceChips } from '../utils/ChipMaker';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import theme from '../theme';
import hexToRgbA from '../utils/hexToRgba';

const Project = (props: {
  project_name?: string | undefined,
  project_description?: string | undefined,
  experience_chips?: string[] | undefined,
  github_link?: string | undefined,
  github_link_text?: string | undefined,
  deployed_link?: string | undefined
  image?: string | undefined
}) => {
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
          <Typography variant="h5" textAlign={"center"}>{props.project_name}</Typography>
        </Grid>
        <Grid item container xs={12} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Box sx={{
              height: "100%",
              width: "100%",
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={props.image}
                style={{
                  borderRadius: 4,
                  border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.2),
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Typography variant="body2" textAlign={"left"}>{props.project_description}</Typography>
        </Grid>
        {
          props.github_link &&
          <Grid item container xs={12} alignItems="center">
            <Grid item>
              <Link href={props.github_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                <GitHubIcon />
                <Typography variant="body2" component="span" textAlign={"left"} ml={1}>{props.github_link_text ? `${props.github_link_text}` : `Check out ${props.project_name} on Github`}</Typography>
              </Link>
            </Grid>
          </Grid>
        }
        {
          props.deployed_link &&
          <Grid item container xs={12} alignItems="center">
            <Grid item>
              <Link href={props.deployed_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                <WebIcon />
                <Typography variant="body2" component="span" textAlign={"left"} ml={1}>Check out a deployed version of {props.project_name}</Typography>
              </Link>
            </Grid>
          </Grid>
        }
        <Grid item container xs={12} justifyContent={"center"}>
          <ExperienceChips>
            <ChipMaker chips={props.experience_chips} />
          </ExperienceChips>
        </Grid>
      </Grid>
    </Grid >
  );
}

export default Project;