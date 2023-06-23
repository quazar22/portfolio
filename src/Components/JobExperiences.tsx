import { Grid, Typography, Chip, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export const Tenzinc = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={12}>
          <Grid container direction="column" alignItems="center">
            {isMobile ?
              <>
                <Typography variant='h5' fontWeight={"bold"}>Tenzinc Ltd</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Software Engineer</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Dec 2021-Present</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Glasgow, Scotland, UK</Typography>
              </>
              :
              <>
                <Typography variant='h5' fontWeight={"bold"}>Tenzinc Ltd, Software Engineer since Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Glasgow, Scotland, UK</Typography>
              </>
            }
            <Grid item container direction="row" alignItems="center" justifyContent={"center"} rowGap={2} columnGap={2} mt={4}>
              <Chip label={"Typescript"} />
              <Chip label={"Javascript"} />
              <Chip label={"HTML/CSS"} />
              <Chip label={"Material UI"} />
              <Chip label={"ReactJS"} />
              <Chip label={"PostgreSQL"} />
              <Chip label={"Firebase"} />
              <Chip label={"Python"} />
              <Chip label={"C#"} />
              <Chip label={".NET"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>At Tenzinc Ltd since December 2021, as a Software Engineer, I've been involved in developing technology services using various web technologies. I work with experts to capture project requirements and define technology details.</Typography>
        <Typography variant='body1' mt={2}>My role includes backend and frontend infrastructure development, encompassing multiple microservices and test frontends. I write tests for these microservices to ensure their proper functioning.</Typography>
        <Typography variant='body1' mt={2}>I use TypeScript, ReactJS, C#, SQL, and Firebase for full-stack development, making use of features like Realtime Database, Firestore, and more. I also work with clients to create custom applications, and use Azure DevOps for version control, CI/CD, and applying agile methods.</Typography>
      </Grid>
    </>
  )
}

export const NVTGroup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={12}>
          <Grid container direction="column" alignItems="center">
            {isMobile ?
              <>
                <Typography variant='h5' fontWeight={"bold"}>NVT Group</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Software Developer</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Nov 2020 - Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Glasgow, Scotland, UK</Typography>
              </>
              :
              <>
                <Typography variant='h5' fontWeight={"bold"}>NVT Group, Software Developer from Nov 2020 - Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Glasgow, Scotland, UK</Typography>
              </>
            }
            <Grid item container direction="row" alignItems="center" justifyContent={"center"} rowGap={2} columnGap={2} mt={4}>
              <Chip label={"Javascript"} />
              <Chip label={"HTML/CSS"} />
              <Chip label={"MSSQL"} />
              <Chip label={"Python"} />
              <Chip label={"C#"} />
              <Chip label={".NET"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>As the Lead Software Developer at NVT Group in Glasgow, UK, from November 2020 to December 2021, I played a pivotal role in Scotland's largest independent IT services provider. I utilized my skills as a full-stack developer using HTML, CSS, JavaScript, C#, Python, and MSSQL to deliver a nationally deployed risk and case management system designed to support the Justice sector.</Typography>
        <Typography variant='body1' mt={2}>A key part of my role was managing complex data migrations into live systems, ensuring zero downtime for users, a task which required meticulous planning and execution. To guarantee that our application could meet the contracted performance requirements, I developed specialized load testing software.</Typography>
        <Typography variant='body1' mt={2}>After deployment, I promptly investigated and resolved any post-go live bugs reported by users, and made sure to provide them with timely feedback. Throughout my tenure, I used Azure Devops for version control, continuous integration/continuous delivery (CI/CD), and project management to ensure a smooth workflow and efficient delivery of services.</Typography>
      </Grid>
    </>
  )
}

export const GreenthumbAutomation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={12}>
          <Grid container direction="column" alignItems="center">
            {isMobile ?
              <>
                <Typography variant='h5' fontWeight={"bold"}>Greenthumb Automation</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Software Developer</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Nov 2020 - Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Albuquerque, NM, US</Typography>
              </>
              :
              <>
                <Typography variant='h5' fontWeight={"bold"}>Greenthumb Automation, Software Developer from Nov 2020 - Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Albuquerque, New Mexico, United States</Typography>
              </>
            }
            <Grid item container direction="row" alignItems="center" justifyContent={"center"} rowGap={2} columnGap={2} mt={4}>
              <Chip label={"PHP"} />
              <Chip label={"Java"} />
              <Chip label={"Swift"} />
              <Chip label={"Python"} />
              <Chip label={"Javascript"} />
              <Chip label={"HTML/CSS"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>At GreenThumb Automation in Albuquerque, New Mexico, I worked as a Software Developer from May 2020 to December 2020, focusing on agricultural technology integration.</Typography>
        <Typography variant='body1' mt={2}>My responsibilities included Java development for an Android app, collaborating with management and clients to improve the app's functionality and user experience.</Typography>
        <Typography variant='body1' mt={2}>To ensure efficient code management and collaboration, I used Git for version control and deployed app builds via Google Play. In addition, I rapidly acquired new programming skills, specifically in Objective-C, HTML, CSS, and JavaScript.</Typography>
      </Grid>
    </>
  )
}

export const TraxInternational = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={12}>
          <Grid container direction="column" alignItems="center">
            {isMobile ?
              <>
                <Typography variant='h5' fontWeight={"bold"}>TRAX International</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Software Developer</Typography>
                <Typography variant='h6' fontWeight={"bold"}>June 2017 - Dec 2019</Typography>
                <Typography variant='h6' fontWeight={"bold"}>White Sands Missile Range, NM, US</Typography>
              </>
              :
              <>
                <Typography variant='h5' fontWeight={"bold"}>TRAX International, Software Developer from Nov 2020 - Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>White Sands Missile Range, NM, US</Typography>
              </>
            }
            <Grid item container direction="row" alignItems="center" justifyContent={"center"} rowGap={2} columnGap={2} mt={4}>
              <Chip label={"HTML/CSS"} />
              <Chip label={"C#"} />
              <Chip label={"Java"} />
              <Chip label={"Python"} />
              <Chip label={"C++"} />
              <Chip label={"Qt"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={4}>At Tenzinc Ltd since December 2021, as a Software Engineer, I've been involved in developing technology services using various web technologies. I work with experts to capture project requirements and define technology details.</Typography>
        <Typography variant='body1' mt={4}>My role includes backend and frontend infrastructure development, encompassing multiple microservices and test frontends. I write tests for these microservices to ensure their proper functioning.</Typography>
        <Typography variant='body1' mt={4}>I use TypeScript, ReactJS, C#, SQL, and Firebase for full-stack development, making use of features like Realtime Database, Firestore, and more.</Typography>
        <Typography variant='body1' mt={4}>I also work with clients to create custom applications, and use Azure DevOps for version control, CI/CD, and applying agile methods.</Typography>
      </Grid>
    </>
  )
}

export const Webmaster = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={12}>
          <Grid container direction="column" alignItems="center">
            {isMobile ?
              <>
                <Typography variant='h5' fontWeight={"bold"}>NVT Group</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Software Developer</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Nov 2020 - Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Albuquerque, NM, US</Typography>
              </>
              :
              <>
                <Typography variant='h5' fontWeight={"bold"}>NVT Group, Software Developer from Nov 2020 - Dec 2021</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Albuquerque, New Mexico, United States</Typography>
              </>
            }
            <Grid item container direction="row" alignItems="center" justifyContent={"center"} rowGap={2} columnGap={2} mt={4}>
              <Chip label={"PHP"} />
              <Chip label={"Java"} />
              <Chip label={"Swift"} />
              <Chip label={"Python"} />
              <Chip label={"Javascript"} />
              <Chip label={"HTML/CSS"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={4}>At Tenzinc Ltd since December 2021, as a Software Engineer, I've been involved in developing technology services using various web technologies. I work with experts to capture project requirements and define technology details.</Typography>
        <Typography variant='body1' mt={4}>My role includes backend and frontend infrastructure development, encompassing multiple microservices and test frontends. I write tests for these microservices to ensure their proper functioning.</Typography>
        <Typography variant='body1' mt={4}>I use TypeScript, ReactJS, C#, SQL, and Firebase for full-stack development, making use of features like Realtime Database, Firestore, and more.</Typography>
        <Typography variant='body1' mt={4}>I also work with clients to create custom applications, and use Azure DevOps for version control, CI/CD, and applying agile methods.</Typography>
      </Grid>
    </>
  )
}