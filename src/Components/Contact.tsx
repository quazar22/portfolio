import React, { PropsWithChildren, ReactNode } from 'react';
import { Container, Grid, Button, Icon } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';
import SectionTitle from './SectionTitle';
import theme from '../theme';
import hexToRgbA from '../utils/hexToRgba';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';

const Contact = () => {
  return (
    <Container maxWidth="lg" id="contact"
      sx={{
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionTitle title="Contact Me" />
        </Grid>
        <Grid item xs={12}>
          {/* Resume download button */}
          <Grid container justifyContent="center">
            <Grid item container justifyContent={"center"} gap={2}>
              <Button
                variant="outlined"
                sx={{
                  '&:hover': {
                    backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
                    boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.3),
                  }
                }}
              >
                <a
                  href="/files/geoffreyknox_resume.pdf"
                  download="geoffreyknox_resume.pdf"
                  style={{
                    textDecoration: "none",
                    textTransform: "none",
                    color: theme.palette.primary.main
                  }}>
                  Resume
                </a>
              </Button>
              <IconButtonStyled
                // open up my github page in a new tab
                onClickCallback={() => window.open("https://github.com/quazar22", "_blank")}
              >
                <GitHubIcon fontSize='large' />
              </IconButtonStyled>
              <IconButtonStyled
                // open up my linkedin page in a new tab
                onClickCallback={() => window.open("https://www.linkedin.com/in/geoffrey-knox-984901194/", "_blank")}
              >
                <LinkedInIcon fontSize='large' />
              </IconButtonStyled>
              <IconButtonStyled
                // open up my email client with my email address filled in
                onClickCallback={() => window.open("mailto:geoffreyknox56@gmail.com")}
              >
                <EmailIcon fontSize='large' />
              </IconButtonStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container >
  );
}

const IconButtonStyled = (props: { onClickCallback?: React.MouseEventHandler<HTMLButtonElement>, children?: ReactNode }) => {
  return (
    <IconButton
      sx={{
        outline: 'none',
        border: 'none',
        padding: '0',
        margin: '0',
        borderRadius: '0',
        ".MuiIconButton-root": {
          border: "red solid 1px"
        }
      }}
      onClick={((event) => { if (props.onClickCallback) props.onClickCallback(event) })}
        >
        { props.children }
    </IconButton >
  )
}

export default Contact;