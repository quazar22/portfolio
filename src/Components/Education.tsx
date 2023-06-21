import React from 'react';
import { Container } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';

const Education = () => {
  return (
    <Container maxWidth="lg" id="education"
      sx={{
        minHeight: `calc(100vh - ${appBarHeight}px)`
      }}
    >
      
    </Container>
  );
}

export default Education;