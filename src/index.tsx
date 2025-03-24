import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// add react router and 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AnimatedBackground from './Components/AnimatedBackground';
import FloatingSquare from './Components/FloatingSquare';
import Blog from './Components/Blog';
import MoreProjects from './Components/MoreProjects';
import NotFound from './NotFound';
import ProjectDetails from './Components/ProjectDetails';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

// create async initial request to store ip address in external database
if (process.env.NODE_ENV === 'production') {
    fetch('https://api.therandomsgenerator.com/logger/access', { method: 'POST' }).catch(err => { });
}

root.render(

    <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/" element={<App />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:blogId" element={<Blog />} />
                    <Route path="/projects" element={<MoreProjects />} />
                    <Route path="/projects/:projectId" element={<MoreProjects />} />
                    {/* <Route path="/projects/:id" element={<ProjectDetails />} /> */}
                </Routes>
            </Router>
        </StyledThemeProvider>
    </ThemeProvider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
