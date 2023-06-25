import React, { PropsWithChildren } from 'react';
import { Chip, Grid } from '@mui/material';

export const ExperienceChips = ({ children }: PropsWithChildren) => {
  return (
    <Grid item container direction="row" alignItems="center" justifyContent={"center"} rowGap={1} columnGap={1} mt={2}>
      {children}
    </Grid>
  )
}

export const ChipMaker = (props: { chips?: string[] }) => {
  return (
    <>
      {props.chips?.map((chip, i) => <Chip key={i} label={chip} />)}
    </>
  );
};