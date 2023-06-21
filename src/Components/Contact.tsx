import React from 'react';
import { Container } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';

const Contact = () => {
  return (
    <Container maxWidth="lg" id="contact"
      sx={{
        minHeight: `calc(100vh - ${appBarHeight}px)`
      }}
    >
      
    </Container>
  );
}

export default Contact;