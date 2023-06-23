import React from 'react';
import { Typography } from '@mui/material';

const heavyTypography = (text: string) => {
  return (
    <Typography variant='h6' fontWeight={"bold"}>{text}</Typography>
  )
};

export default heavyTypography;