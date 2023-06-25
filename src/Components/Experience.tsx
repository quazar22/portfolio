import React, { PropsWithChildren } from 'react';
import { Container, Box, Tabs, Tab, Typography, Grid, Chip } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import heavyTypography from '../utils/heavyTypography';
import * as Experiences from './JobExperiences';
import hexToRgbA from '../utils/hexToRgba';
import SectionTitle from './SectionTitle';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Experience = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const smallerThanLg = useMediaQuery(theme.breakpoints.down('lg'));

  var items = [
    <Experiences.Tenzinc />,
    <Experiences.NVTGroup />,
    <Experiences.GreenthumbAutomation />,
    <Experiences.TraxInternational />,
    <Experiences.Webmaster />
  ]

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" id="experience"
      sx={{
      }}
    >
      <SectionTitle title="Experience" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="tabs" variant={smallerThanLg ? 'scrollable' : 'standard'} allowScrollButtonsMobile sx={{}} centered>
            <Tab label={heavyTypography("Tenzinc Ltd")} {...a11yProps(0)} sx={{ textTransform: "none" }} />
            <Tab label={heavyTypography("NVT Group")} {...a11yProps(1)} sx={{ textTransform: "none" }} />
            <Tab label={heavyTypography("Greenthumb Automation")} {...a11yProps(2)} sx={{ textTransform: "none" }} />
            <Tab label={heavyTypography("TRAX International")} {...a11yProps(3)} sx={{ textTransform: "none" }} />
            <Tab label={heavyTypography("NM Tech")} {...a11yProps(4)} sx={{ textTransform: "none" }} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Experiences.Tenzinc />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Experiences.NVTGroup />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Experiences.GreenthumbAutomation />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Experiences.TraxInternational />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Experiences.Webmaster />
        </TabPanel>
      </Box>

    </Container>
  );
}

function Item({ children }: PropsWithChildren) {
  const theme = useTheme();
  return (
    <Box
      minHeight={"100vh"}
    >

      <Box
        height={"100%"}
        sx={{
          p: 2,
          border: '1px solid ' + hexToRgbA(theme.palette.primary.main, 0.3),
          borderRadius: '10px',
          transition: 'border-color 0.15s ease-in-out, background-color 0.15s ease-in-out',
          '&:hover': {
            borderColor: hexToRgbA(theme.palette.background.default, 0.3),
            backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
          },
        }}
      >
        {children}
      </Box>

    </Box>
  )
}

export default Experience;