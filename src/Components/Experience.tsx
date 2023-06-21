import React from 'react';
import { Container } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';

const Experience = () => {
  return (
    <Container maxWidth="lg" id="experience"
      sx={{
        minHeight: `calc(100vh - ${appBarHeight}px)`
      }}
    >
      
    </Container>
  );
}

export default Experience;