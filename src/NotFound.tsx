import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="sm"
            sx={{
                textAlign: 'center',
                mt: { xs: 8, sm: 12 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h1" component="h1" color="error" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Oops! Page Not Found.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                The page you are looking for might have been removed or is temporarily unavailable.
            </Typography>
            <Box>
                <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                    Back Home
                </Button>
            </Box>
        </Container>
    );
}
