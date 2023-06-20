import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { Box, Grid, Typography, Container, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={2} mt={isMobile ? 4 : 16} alignItems={"center"}>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" alignItems="center">
              <Typography variant={isMobile ? "h4" : "h3"}>Geoffrey Knox</Typography>
              <Typography variant={isMobile ? "h5" : "h5"}>Software Engineer</Typography>
              {/* add avatar from src/pics/me.jpg */}
              <Avatar src={'/pics/me.jpg'} alt="Profile Picture" sx={{ width: 256, height: 256, mt: 2 }} />
              {/* <Avatar src="https://your-image-url.jpg" alt="Profile Picture" sx={{ width: 56, height: 56, mt: 2 }} /> */}
            </Grid>
          </Grid>
          {/* vertically center the typography in the grid */}
          <Grid item xs={12} md={6} p={2}>
            <Typography variant="body1" textAlign={"center"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              aliquam, velit vitae aliquam fermentum, nisl nunc aliquet nunc, quis
              aliquam nisl nunc non nisi. Donec euismod, nisl eget aliquam
              ultricies, nunc nisl aliquam nisl, vitae aliquam nisl nunc non
              ipsum. Donec aliquam, velit vitae aliquam fermentum, nisl nunc
              aliquet nunc, quis aliquam nisl nunc non nisi. Donec euismod, nisl
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
