import { Grid, Typography, Chip, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PropsWithChildren } from "react";
import { ChipMaker, ExperienceChips } from "../utils/ChipMaker";

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
            <ExperienceChips>
              <ChipMaker chips={[".NET", "C#", "Firebase", "HTML/CSS", "Javascript", "Material UI", "PostgreSQL", "Python", "ReactJS", "Typescript", "DigitalOcean"]} />
            </ExperienceChips>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>At Tenzinc, I work across a wide range of responsibilities, from Linux system administration and IoT deployment to full-stack development and internal tooling. I manage cloud infrastructure on DigitalOcean (Ubuntu/Debian), maintain platform uptime, and build fault-tolerant software deployed through custom APT and Python package servers I set up and maintain.</Typography>
        <Typography variant='body1' mt={2}>On the IoT side, I've installed and supported devices across multiple customer locations, developed telemetry analysis tools, built real-time dashboards using Thingsboard (HTML, CSS, JS), and written APIs for device and user management using FastAPI, Node.js/Express, and Next.js.</Typography>
        <Typography variant='body1' mt={2}>To support the broader business, I contribute to full-stack web development with React, Next.js, and C#/ASP.NET, building customer facing dashboards, internal tools, and company platforms. I've also created APIs for document and transaction management as part of bespoke internal systems.</Typography>
        <Typography variant='body1' mt={2}>Outside of engineering, I often interface directly with customers for support, handle platform provisioning, and work hands-on to ensure smooth and scalable delivery of our services. I use Azure DevOps for version control, CI/CD, and project management, and follow agile workflows across projects.</Typography>
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
            <ExperienceChips>
              <ChipMaker chips={[".NET", "C#", "HTML/CSS", "Javascript", "MSSQL", "Python"]} />
            </ExperienceChips>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>As a Software Developer at NVT Group in Glasgow, UK, from November 2020 to December 2021, I played a pivotal role in Scotland's largest independent IT services provider. I utilized my skills as a full-stack developer using HTML, CSS, JavaScript, C#, Python, and MSSQL to deliver a nationally deployed risk and case management system designed to support the Justice sector.</Typography>
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
            <ExperienceChips>
              <ChipMaker chips={["Android", "C#", "HTML/CSS", "Java", "Javascript", "MySQL", "PHP", "Python", "Swift"]} />
            </ExperienceChips>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>At GreenThumb Automation in Albuquerque, New Mexico, I worked as a Software Developer from May 2020 to December 2020, focusing on agricultural technology integration.</Typography>
        <Typography variant='body1' mt={2}>My responsibilities included Java development for an Android app, collaborating with management and clients to improve the app's functionality and user experience. I also expanded application functionality by adding local user device integration, wrote PHP to communicate with MySQL to access device and user data.</Typography>
        <Typography variant='body1' mt={2}>To ensure efficient code management and collaboration, I used Git for version control and deployed app builds via Google Play. In addition, I rapidly acquired new programming skills, specifically in Swift, HTML, CSS, and JavaScript.</Typography>
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
                <Typography variant='h6' fontWeight={"bold"}>Software Development Intern</Typography>
                <Typography variant='h6' fontWeight={"bold"}>June 2017 - Dec 2019</Typography>
                <Typography variant='h6' fontWeight={"bold"}>White Sands Missile Range, NM, US</Typography>
              </>
              :
              <>
                <Typography variant='h5' fontWeight={"bold"}>TRAX International, Software Development Intern from June 2017 - December 2019</Typography>
                <Typography variant='h6' fontWeight={"bold"}>White Sands Missile Range, NM, US</Typography>
              </>
            }
            <ExperienceChips>
              <ChipMaker chips={["C#", "C++", "HTML/CSS", "Java", "Python", "Qt"]} />
            </ExperienceChips>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>Assisted on multiple projects during undergraduate degree including network engineering and software engineering projects for TRAX Intl. telemetry department.</Typography>
        <Typography variant='body1' mt={2}>Added functionality to internal software tools for secure video file handling and object tracking using C++, Qt, Python, and Java.</Typography>
        <Typography variant='body1' mt={2}>Worked in the Management Information Systems department maintaining web interfaces for the tracking of project spending and assets for the company using a combination of K2 Blackpearl, C#, and T-SQL.</Typography>
        <Typography variant='body1' mt={2}>Participated in sprints and collaborated with full time employees to deliver projects on time.</Typography>
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
                <Typography variant='h5' fontWeight={"bold"}>New Mexico Tech</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Webmaster</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Mar 2016 - Jan 2018</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Socorro, NM, US</Typography>
              </>
              :
              <>
                <Typography variant='h5' fontWeight={"bold"}>New Mexico Tech, Webmaster from March 2016 - January 2018</Typography>
                <Typography variant='h6' fontWeight={"bold"}>Socorro, New Mexico, United States</Typography>
              </>
            }
            <ExperienceChips>
              <ChipMaker chips={["HTML/CSS", "Java", "Javascript", "PHP", "Python"]} />
            </ExperienceChips>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant='body1' mt={2}>Maintained websites for the Office of Student Learning. Wrote and reworked code in HTML, CSS, and Javascript based on requests and user need.</Typography>
        <Typography variant='body1' mt={2}>Implemented quick bugfixes and performed large code refactors for better code reusability and easier deployment.</Typography>
        <Typography variant='body1' mt={2}>Wrote backend services in PHP for managing and showing data on websites.</Typography>
      </Grid>
    </>
  )
}