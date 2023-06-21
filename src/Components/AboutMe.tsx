import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import hexToRgbA from '../utils/hexToRgba';
import { appBarHeight } from '../utils/appBarHeight';

const AboutMe = () => {
  const theme = useTheme();
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


  return (
    <Container maxWidth="lg" id="aboutme"
      sx={{
        minHeight: `calc(100vh - ${appBarHeight}px)`
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
                  boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.75),
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <Typography
            variant="body1"
            textAlign={"left"}
            sx={{
              p: 2,
              border: '1px solid ' + theme.palette.primary.main,
              borderRadius: '10px',
              transition: 'border-color 0.15s ease-in-out, background-color 0.15s ease-in-out',
              '&:hover': {
                borderColor: hexToRgbA(theme.palette.primary.main, 0.5),
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.5),
              },
            }}
          >
            Hello, I'm a dedicated software engineer currently residing in Glasgow, Scotland. My experience spans both frontend and backend development, with an affinity for learning and applying diverse technologies and languages.
          </Typography>
          <Typography
            variant="body1"
            textAlign={"left"}
            mt={2}
            sx={{
              p: 2,
              border: '1px solid ' + theme.palette.primary.main,
              borderRadius: '10px',
              transition: 'border-color 0.15s ease-in-out, background-color 0.15s ease-in-out',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.5),
              },
            }}
          >
            My wife and I relocated from the United States to Scotland in 2020 for her to undertake her Doctor of Veterinary Medicine studies at the University of Glasgow. This move not only widened my cultural perspective but also enriched my professional journey. I've found that a remote work setting aligns best with my preference for flexibility and focus. Now, I'm actively on the lookout for new remote opportunities worldwide, ready to bring my skill set to new challenges.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutMe;