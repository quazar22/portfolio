import { useState, useEffect, useRef } from 'react';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { Box, Grid, Typography, Container, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import hexToRgbA from './utils/hexToRgba';
import AboutMe from './Components/AboutMe';
import Experience from './Components/Experience';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import { pageIds } from './pages';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const appBarHeight = 64; // AppBar height. You can adjust this as needed.

  const sectionRefs = useRef<(HTMLElement | null)[]>([]); // use this in the future to get the current section

  const aboutRef = useRef<null | HTMLDivElement>(null);
  const experienceRef = useRef<null | HTMLDivElement>(null);
  const projectsRef = useRef<null | HTMLDivElement>(null);
  const contactRef = useRef<null | HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string>("");

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let id = entry.target.children[0].id;
          if (entry.isIntersecting) {
            // console.log(`Element with id '${id}' is now inside the viewport`);
            setCurrentSection(id);
          } else {
            // console.log(`Element with id '${id}' is now outside the viewport`);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(aboutRef.current as HTMLDivElement);
    observer.observe(experienceRef.current as HTMLDivElement);
    observer.observe(projectsRef.current as HTMLDivElement);
    observer.observe(contactRef.current as HTMLDivElement);

    // on first load, scroll to the top of the page and set the current section to the first section ("aboutme")
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth"
    // });
    setCurrentSection(pageIds[0]);
    // console.log("default current section: " + pageIds[0])

    return () => {
      observer.unobserve(aboutRef.current as HTMLDivElement);
      observer.unobserve(experienceRef.current as HTMLDivElement);
      observer.unobserve(projectsRef.current as HTMLDivElement);
      observer.unobserve(contactRef.current as HTMLDivElement);

      observer.disconnect();
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
        <ResponsiveAppBar currentSection={currentSection} />
        <div ref={aboutRef} style={{ marginBottom: isMobile ? "4rem" : "8rem" }}><AboutMe /></div>
        <div ref={experienceRef} style={{ marginBottom: isMobile ? "4rem" : "8rem" }}><Experience /></div>
        <div ref={projectsRef} style={{ marginBottom: isMobile ? "4rem" : "8rem" }}><Projects /></div>
        <div ref={contactRef} style={{ marginBottom: isMobile ? "4rem" : "4rem" }}><Contact /></div>
        <FinalDivider />
        <div style={{ marginBottom: isMobile ? "4rem" : "4rem" }}><Footer /></div>
      </Box>
    </>
  );
}

const FinalDivider = () => {
  const theme = useTheme();
  let isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container maxWidth="lg">
      <Divider style={{ marginBottom: isMobile ? "4rem" : "4rem", backgroundColor: hexToRgbA(theme.palette.primary.main, 0.1) }} />
    </Container>
  )
}



export default App;