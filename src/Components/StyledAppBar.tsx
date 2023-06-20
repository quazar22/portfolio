import { AppBar } from "@mui/material";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  && {
    background-color: ${(props) => props.theme.palette.primary.main};
    display: inline-block;
    white-space: nowrap;
    text-decoration: none;
    // margin-right: 8px;
    margin-right: 6px;
    // font size 1.25rem = 20px
    font-size: 1.25rem;
    // remove border
    border: none;
    // remove box shadow
    box-shadow: none;
    outline: none;
    // make app bar sticky
`;

export default StyledAppBar;