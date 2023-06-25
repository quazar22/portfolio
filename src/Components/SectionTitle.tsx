import { Typography } from "@mui/material";

const SectionTitle = (props: { title: string }) => {
  return (
    <Typography variant="h4" textAlign={"center"} mb={4} fontWeight={"bold"} sx={{ textDecoration: "none" }}>
      {props.title}
    </Typography>
  );
};

export default SectionTitle;