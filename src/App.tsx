import { useState, useEffect } from 'react';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { Box, Grid, Typography, Container, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import hexToRgbA from './utils/hexToRgba';
import AboutMe from './Components/AboutMe';
import Experience from './Components/Experience';
import Education from './Components/Education';
import Contact from './Components/Contact';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = 64; // AppBar height. You can adjust this as needed.

  const scrollTo = (event: MouseEvent) => {
    event.preventDefault();
    const targetElement = event.target as HTMLAnchorElement;
    const targetId = targetElement.getAttribute('href');
    if (targetId) {
      const target = document.querySelector<HTMLElement>(targetId);
      if (target) {
        const targetPosition = target.offsetTop;
        const offsetPosition = targetPosition - appBarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')); // select all links that starts with #
    links.forEach(link => {
      link.addEventListener('click', scrollTo);
    });

    // cleanup event listeners
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', scrollTo);
      });
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: "#041925",
          zIndex: -100, // To ensure the background is behind other content
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '70%',
          height: '70%',
          backgroundImage: 'linear-gradient(315deg, rgba(105,185,91,0.09567577030812324) 10%, rgba(4,25,37,1) 37%);',
          zIndex: -99, // To ensure the gradient is above the base background color but below the content
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <ResponsiveAppBar />
        <AboutMe />
        <Experience />
        <Education />
        <Contact />
      </Box>
    </>
  );
}

const Filler = () => {
  return (
    <div>
      <Typography>
        Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Ut Enim Ad Minim Veniam Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur Excepteur Sint Occaecat Cupidatat Non Proident Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum
        Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Ut Enim Ad Minim Veniam Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur Excepteur Sint Occaecat Cupidatat Non Proident Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum
        Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Ut Enim Ad Minim Veniam Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur Excepteur Sint Occaecat Cupidatat Non Proident Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum
      </Typography>
    </div>
  )
}

export default App;