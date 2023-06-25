import React from 'react';
import { Container, Grid } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';
import SectionTitle from './SectionTitle';

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
      </Grid>

    </Container>
  );
}

export default Contact;