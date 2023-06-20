import { useState, useEffect } from 'react';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { Box, Grid, Typography, Container, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import hexToRgbA from './utils/hexToRgba';
import AboutMe from './Components/AboutMe';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = 64; // AppBar height. You can adjust this as needed.

  const scrollTo = (event: MouseEvent) => {
    event.preventDefault();
    const targetElement = event.target as HTMLAnchorElement;
    const targetId = targetElement.getAttribute('href');
    if(targetId) {
      const target = document.querySelector<HTMLElement>(targetId);
      if(target) {
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
      <ResponsiveAppBar />
      <AboutMe />
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