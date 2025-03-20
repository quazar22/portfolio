import React, { useEffect, useState, useRef } from 'react';
import { getApiUrl } from '../utils/url';
import { ProjectType } from '../Models/Project';

import { Container, Typography, Pagination, Grid, TextField, Box, useMediaQuery, Button, IconButton } from '@mui/material';
import hexToRgbA from '../utils/hexToRgba';
import theme from '../theme';
import StyledButton from './StyledButton';
import { FileUploader } from 'react-drag-drop-files-variable-upload-label';


import { ChipMaker, ExperienceChips } from '../utils/ChipMaker';

import ClearIcon from '@mui/icons-material/Clear';

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

const ProjectAdmin = () => {
    let isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [projects, setProjects] = useState([] as ProjectType[]);

    const [experienceChipInput, setExperienceChipInput] = React.useState<string>('' as string);
    const [chips, setChips] = React.useState([] as string[]);

    const chipRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState([] as File[]);
    const [errorDialog, setErrorDialog] = useState("");

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [deployedLink, setDeployedLink] = useState("");
    const [videoLink, setVideoLink] = useState("");


    const onExperienceChipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperienceChipInput(event.target.value);
    }

    const addChip = (chip: string) => {
        if (chip === "" || chips.includes(chip) || !chip) {
            return;
        }
        let newChips = chips;
        newChips.push(chip);
        setChips(newChips);
        chipRef.current!.value = "";
        setExperienceChipInput("");
    }

    const handleAddProject = () => {
        const api_endpoint = getApiUrl() + '/projects';
        const formData = new FormData();

        const titleValue = projectTitle;
        const descriptionValue = projectDescription;
        const githubLinkValue = githubLink;
        const deployedLinkValue = deployedLink;
        const videoLinkValue = videoLink;

        
    }

    useEffect(() => {
        const getProjects = async () => {
            console.log(process.env.REACT_APP_API_URL);
            const api_endpoint = getApiUrl() + '/projects';
            const response = await fetch(api_endpoint);
            const data = await response.json();
            let projects_list: ProjectType[] = [] as ProjectType[];
            if (!data.data || data.data.length === 0) {
                return;
            }
            for (let project of data.data) {
                projects_list.push(project);
            }
            setProjects(projects_list);
            console.log(data);
        }
        getProjects();
    }, []);

    const handleFileUpload = (x: any) => {
        let fileObj = x;
        if (fileObj.size < 0 || fileObj.size > 10000000) {
            setErrorDialog("File must be between 0 and 10mb.");
        } else {
            setErrorDialog("");
            setFiles([...files, ...fileObj]);
        }
    }

    return (
        <Container>
            <Grid container spacing={2} justifyContent={"center"}>
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
                    mt={4}
                >

                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={12}>
                            <Typography variant='h5' sx={{ textAlign: "center" }}>
                                Add Project
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                label={`Project Title`}
                                fullWidth
                                inputMode='text'
                                autoComplete='off'
                                type='text'
                                required
                                sx={TextAreaStyles}
                                inputProps={{ maxLength: 50 }}
                                onChange={(e) => { setProjectTitle(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                label={`Description`}
                                fullWidth
                                inputMode='text'
                                autoComplete='off'
                                type='text'
                                required
                                sx={TextAreaStyles}
                                inputProps={{ maxLength: 250 }}
                                onChange={(e) => { setProjectDescription(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{ textAlign: "center" }}>
                                Links
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                label={`Github Link`}
                                fullWidth
                                inputMode='text'
                                autoComplete='off'
                                type='text'
                                sx={TextAreaStyles}
                                inputProps={{ maxLength: 250 }}
                                onChange={(e) => { setGithubLink(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                label={`Deployed Link`}
                                fullWidth
                                inputMode='text'
                                autoComplete='off'
                                type='text'
                                sx={TextAreaStyles}
                                inputProps={{ maxLength: 250 }}
                                onChange={(e) => { setDeployedLink(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                label={`Video Link`}
                                fullWidth
                                inputMode='text'
                                autoComplete='off'
                                type='text'
                                sx={TextAreaStyles}
                                inputProps={{ maxLength: 250 }}
                                onChange={(e) => { setVideoLink(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{ textAlign: "center" }}>
                                Experience Chips
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                variant='outlined'
                                label={`Experience Chips`}
                                fullWidth
                                inputMode='text'
                                autoComplete='off'
                                type='text'
                                sx={TextAreaStyles}
                                inputProps={{ maxLength: 15, ref: chipRef }}
                                onChange={onExperienceChipChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledButton
                                variant="outlined"
                                color='primary'
                                size='large'
                                sx={{ width: '100%' }}
                                onClick={() => { addChip(chipRef.current?.value as string) }}
                            >
                                Add
                            </StyledButton>
                        </Grid>

                        <Grid item xs={12}>
                            <ExperienceChips>
                                {
                                    chips.length > 0 ? <ChipMaker chips={chips} /> : null
                                }
                            </ExperienceChips>
                        </Grid>

                        <Grid item container justifyContent={"center"} xs={12}>
                            <Grid item xs={12}>
                                <Typography variant='h6' sx={{ textAlign: "center" }}>
                                    Images
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <FileUploader
                                    handleChange={handleFileUpload}
                                    multiple={true}
                                    maxSize={10_000_000}
                                    minSize={0}
                                    // onSizeError={handleWrongSizeFile}
                                    required={true}
                                    label={"Add an image by dragging and dropping or clicking here."}
                                    hoverTitle={"Drop the file here"}
                                    types={["png", "jpg", "jpeg", "gif"]}
                                    single={true}
                                />
                            </Grid>
                            <Grid item xs={12} mt={4}>
                                {files.length > 0 ? files.map(file => (
                                    <Box display="flex" alignItems="center"
                                        sx={{
                                            borderRadius: '10px',
                                            backgroundColor: hexToRgbA(theme.palette.background.paper, 0.1),
                                            outline: hexToRgbA(theme.palette.primary.main, 0.35) + ' solid 1px'
                                        }}
                                        mt={1}
                                    >
                                        <IconButton onClick={() => { setFiles(files.filter(f => f !== file)) }}>
                                            <ClearIcon />
                                        </IconButton>
                                        <Typography variant='body1'>{file.name}</Typography>
                                    </Box>
                                    // <Typography variant='body1'>{file.name}</Typography>
                                )) : null}
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} justifyContent={"center"} mt={4}>
                            <Grid item xs={3}>
                                <StyledButton
                                    variant="outlined"
                                    color='primary'
                                    size='large'
                                    sx={{ width: '100%' }}
                                    onClick={() => { handleAddProject() }}
                                >
                                    Add Project
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Grid item xs={12} mt={4}>
                    <Typography variant='h5' sx={{ textAlign: "center" }}>
                        Edit Project
                    </Typography>
                    {projects.map(project => (
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <Typography variant='h4'>{project.title}</Typography>
                            <Typography variant='body1'>{project.description}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProjectAdmin;