import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, Avatar, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import hexToRgbA from '../utils/hexToRgba';
import { appBarHeight } from '../utils/appBarHeight';
import StyledButton from './StyledButton';
import { useNavigate } from 'react-router-dom';

const AboutMe = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [myName, setMyName] = useState('Geoffrey Knox');
  const [showUnderscore, setShowUnderscore] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowUnderscore(prevShowUnderscore => !prevShowUnderscore);
    }, 500);

    // Don't forget to clear your interval on component unmount to prevent memory leaks
    return () => {
      clearInterval(interval);
    };
  }, []);

  const BioBoxStyle = () => {
    return (
      {
        p: 2,
        border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.3),
        borderRadius: '10px',
        transition: 'border-color 0.15s ease-in-out, background-color 0.15s ease-in-out',
        color: theme.palette.text.primary,
        '&:hover': {
          borderColor: hexToRgbA(theme.palette.background.default, 0.3),
          backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
          boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.3),
        },
        justifyContent: "center",
      }
    )
  }

  return (
    <Container maxWidth="lg" id="aboutme"
      sx={{
      }}
    >
      <Grid container spacing={2} mt={isMobile ? 8 : 16} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <Grid container direction="column" alignItems="center">
            <Typography variant={isMobile ? "h4" : "h3"}>{myName}<span style={{ opacity: showUnderscore ? "1" : "0" }}>_</span></Typography>
            <Typography variant={isMobile ? "h5" : "h5"}>Software Engineer</Typography>
            <Avatar
              src={'/pics/me.jpg'}
              alt="Profile Picture"
              sx={{
                width: isMobile ? 128 : 256,
                height: isMobile ? 128 : 256,
                mt: 2,
                transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.5),
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} p={2}>
          <Grid item xs={12} sx={BioBoxStyle()}>
            <Typography
              variant="body1"
              textAlign={"left"}
              mb={2}
            >
              Hello, I'm Geoffrey - a software engineer based in Glasgow, Scotland.
            </Typography>
            <Typography
              variant="body1"
              textAlign={"left"}
              mb={2}
            >
              I work across the stack, building everything from backend services and APIs to internal tools and dashboards. I’ve worked on IoT platforms, cloud infrastructure, and custom deployment systems, and I enjoy solving real-world problems with clean, reliable code.
            </Typography>
            <Typography
              variant="body1"
              textAlign={"left"}
            >
              I like being part of teams that care about the work and support each other. Outside of work, I spend time with my wife and our two dogs, explore the Scottish countryside, play games, and work on side projects to keep learning.
            </Typography>
          </Grid>
          {/* <Typography
            variant="body1"
            textAlign={"left"}
            mt={2}
            sx={BioBoxStyle()}
          >
            My wife and I relocated from the United States to Scotland in 2020 for her to undertake her Doctor of Veterinary Medicine studies at the University of Glasgow. This move not only widened my cultural perspective but also enriched my professional journey. I've found that a remote work setting aligns best with my preference for flexibility and focus. Now, I'm actively on the lookout for new remote opportunities worldwide, ready to bring my skill set to new challenges.
          </Typography> */}
          <Grid item xs={12} mt={2}>
            <StyledButton
              id="contact-me-button"
              sx={{
                outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.3),
                '&:hover': {
                  outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, .5),
                  backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
                  // boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.3),
                }
              }}
              onClick={() => {
                const contact = document.getElementById('contact');
                if (!contact) return;
                const contactPosition = contact.offsetTop;
                const offsetPosition = contactPosition - appBarHeight;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }}
            >
              Contact Me
            </StyledButton>
            <StyledButton
              id="contact-me-button"
              sx={{
                outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.3),
                '&:hover': {
                  outline: '1px solid ' + hexToRgbA(theme.palette.primary.main, .5),
                  backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
                  // boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.3),
                }
              }}
              onClick={() => {
                navigate('/blog');
              }}
            >
              My Blog
            </StyledButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutMe;