import { Box, Grid, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  let theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              align="center"
              sx={{
                color: theme.palette.additionalText.dark
              }}>
              Created by Geoffrey Knox using React, TypeScript, and Material UI.
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{
                color: theme.palette.additionalText.dark
              }}>
              {process.env.REACT_APP_VERSION} - {new Date().getFullYear()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer;