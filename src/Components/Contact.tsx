import React, { PropsWithChildren, ReactNode } from 'react';
import { Container, Grid, Button, Icon, Box, Typography, useMediaQuery, TextField } from '@mui/material';
import { appBarHeight } from '../utils/appBarHeight';
import SectionTitle from './SectionTitle';
import theme from '../theme';
import hexToRgbA from '../utils/hexToRgba';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import { getApiUrl } from '../utils/url';

const Contact = () => {
  let isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const maxMessageLength = 1000;
  const maxSubjectLength = 50;
  const maxNameEmailLength = 50;

  const nameEmailRef = React.useRef<HTMLInputElement>(null);
  const subjectRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLInputElement>(null);

  const [nameEmailState, setNameEmailState] = React.useState<string>("");
  const [subjectState, setSubjectState] = React.useState<string>("");
  const [messageState, setMessageState] = React.useState<string>("");

  const [nameEmailErrorState, setNameEmailErrorState] = React.useState<boolean>(false);
  const [subjectErrorState, setSubjectErrorState] = React.useState<boolean>(false);
  const [messageErrorState, setMessageErrorState] = React.useState<boolean>(false);

  const [messageSentStatusText, setMessageSentStatusText] = React.useState<string>("");
  const [messageSentIsError, setMessageSentIsError] = React.useState<boolean>(false);

  const onNameEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameEmailState(event.target.value);
    if (event.target.value.length !== 0) {
      setNameEmailErrorState(false);
    } else {
      setNameEmailErrorState(true);
    }
  }

  const onSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectState(event.target.value);
  }

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageState(event.target.value);
    if (event.target.value.length !== 0) {
      setMessageErrorState(false);
    } else {
      setMessageErrorState(true);
    }
  }

  const onSendClick = () => {
    let nameEmail = nameEmailState;
    let subject = subjectState;
    let message = messageState;

    // if any of the fields are empty, default to the ref values. If the ref values are empty, set the mui textfield error state to true
    if (nameEmail === "") {
      if (nameEmailRef.current?.value && nameEmailRef.current.value.length !== 0) {
        nameEmail = nameEmailRef.current.value;
      }
      else {
        setNameEmailErrorState(true);
      }
    }
    if (message === "") {
      if (messageRef.current?.value && messageRef.current.value.length !== 0) {
        message = messageRef.current.value;
      }
      else {
        setMessageErrorState(true);
      }
    }
    // send post request to backend
    if (nameEmail !== "" && message !== "") {
      const api_endpoint = getApiUrl() + '/contact';
      fetch(api_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name_email: nameEmail,
          subject: subject,
          message: message
        })
      }).then((response) => {
        if (response.ok) {
          // clear the text fields
          setNameEmailState("");
          setSubjectState("");
          setMessageState("");
          // clear the ref values
          if (nameEmailRef.current) nameEmailRef.current.value = "";
          if (subjectRef.current) subjectRef.current.value = "";
          if (messageRef.current) messageRef.current.value = "";
          // set the message sent status text
          setMessageSentStatusText("Message sent successfully!");
          setMessageSentIsError(false);
        } else {
          console.log(response);
          setMessageSentStatusText("Error sending message. Please try again later.");
          setMessageSentIsError(true);
        }
      }).catch((error) => {
        console.log(error);
        setMessageSentStatusText("Error sending message. Please try again later.");
        setMessageSentIsError(true);
      });
    }
  }

  return (
    <Container maxWidth="lg" id="contact"
      sx={{
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionTitle title="Contact Me" />
        </Grid>
        <Grid item xs={12}>
          {/* Resume download button */}
          <Grid container justifyContent="center">
            <Grid item container justifyContent={"center"} gap={2}>
              <Button
                variant="outlined"
                sx={{
                  '&:hover': {
                    backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
                    boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.3),
                  }
                }}
              >
                <a
                  href="/files/geoffreyknox_resume.pdf"
                  download="geoffreyknox_resume.pdf"
                  style={{
                    textDecoration: "none",
                    textTransform: "none",
                    color: theme.palette.primary.main
                  }}>
                  Resume
                </a>
              </Button>
              <IconButtonStyled
                // open up my github page in a new tab
                onClickCallback={() => window.open("https://github.com/quazar22", "_blank")}
              >
                <GitHubIcon fontSize='large' />
              </IconButtonStyled>
              <IconButtonStyled
                // open up my linkedin page in a new tab
                onClickCallback={() => window.open("https://www.linkedin.com/in/geoffrey-knox/", "_blank")}
              >
                <LinkedInIcon fontSize='large' />
              </IconButtonStyled>
              <IconButtonStyled
                // open up my email client with my email address filled in
                onClickCallback={() => window.open("mailto:geoffreyknox56@gmail.com")}
              >
                <EmailIcon fontSize='large' />
              </IconButtonStyled>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent={"center"}>
          <Box
            width={isMobile ? "100%" : "75%"}
            padding={"2rem"}
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              backgroundColor: hexToRgbA(theme.palette.background.paper, 0.1),
              outline: hexToRgbA(theme.palette.primary.main, 0.15) + ' solid 1px',
            }}
          >
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item xs={12} md={6}>
                {/* I am repeating code here since I do not want to deal with forwardRefs. Sue me. */}
                <TextField
                  variant='outlined'
                  label={`Name/Email (${nameEmailState.length}/${maxNameEmailLength})`}
                  fullWidth
                  inputMode='text'
                  autoComplete='off'
                  type='text'
                  required
                  error={nameEmailErrorState}
                  sx={TextAreaStyles}
                  inputProps={{ maxLength: maxNameEmailLength, ref: nameEmailRef }}
                  onChange={onNameEmailChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant='outlined'
                  label={`Subject (${subjectState.length}/${maxSubjectLength})`}
                  fullWidth
                  inputMode='text'
                  autoComplete='off'
                  type='text'
                  error={subjectErrorState}
                  sx={TextAreaStyles}
                  inputProps={{ maxLength: maxSubjectLength, ref: subjectRef }}
                  onChange={onSubjectChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  label={`Message (${messageState.length}/${maxMessageLength})`}
                  fullWidth
                  inputMode='text'
                  autoComplete='off'
                  type='text'
                  required
                  error={messageErrorState}
                  multiline
                  rows={isMobile ? 4 : 8}
                  sx={TextAreaStyles}
                  inputProps={{ maxLength: maxMessageLength, ref: messageRef }}
                  onChange={onMessageChange}
                />
              </Grid>
              <Grid item container xs={12} justifyContent={"center"}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onSendClick();
                  }}
                  sx={{
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: hexToRgbA(theme.palette.customPalette.dark, 0.3),
                      boxShadow: '0 0 10px 5px ' + hexToRgbA(theme.palette.primary.main, 0.3),
                    }
                  }}
                >
                  Send
                </Button>
              </Grid>
              <Grid item container xs={12} justifyContent={"center"}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color: messageSentIsError ? theme.palette.error.main : theme.palette.success.main
                  }}>
                  {messageSentStatusText}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container >
  );
}

const TextAreaStyles = {
  "& .MuiOutlinedInput-notchedOutline": {
  },
  backgroundColor: hexToRgbA(theme.palette.customPalette.main, 0.25),
  "& .MuiInputBase-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      border: hexToRgbA(theme.palette.primary.main, 0.15) + " solid 1px",
    },
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: hexToRgbA(theme.palette.primary.main, 0.25) + " solid 1px",
        backgroundColor: hexToRgbA(theme.palette.background.paper, 0.05),
      },
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: hexToRgbA(theme.palette.primary.main, 0.65) + " solid 1px",
        backgroundColor: hexToRgbA(theme.palette.background.paper, 0.05),
      },
    },
  },
}


const IconButtonStyled = (props: { onClickCallback?: React.MouseEventHandler<HTMLButtonElement>, children?: ReactNode }) => {
  return (
    <IconButton
      sx={{
        outline: 'none',
        border: 'none',
        padding: '0',
        margin: '0',
        borderRadius: '0',
        ".MuiIconButton-root": {
          border: "red solid 1px"
        }
      }}
      onAuxClick={((event) => { if (props.onClickCallback) props.onClickCallback(event) })}
      onClick={((event) => { if (props.onClickCallback) props.onClickCallback(event) })}
    >
      {props.children}
    </IconButton >
  )
}

export default Contact;