import styled from 'styled-components';
import Button from '@mui/material/Button';
import hexToRgbA from '../utils/hexToRgba';

const StyledButtonUnderline = styled(Button)`
&& {
  background-color: ${(props) => hexToRgbA(props.theme.palette.customPalette.dark, 0.3)};
  color: ${(props) => props.theme.palette.primary.main};
  display: inline-block;
  position: relative;
  white-space: nowrap;
  text-decoration: none;
  text-transform: none;
  cursor: pointer;
  // margin-right: 8px;
  margin-right: 6px;
  // font size 1.25rem = 20px
  font-size: 1rem;
  // remove border
  border: none;
  // remove box shadow
  box-shadow: none;
  outline: none;


  &:hover {
    text-decoration: none;
    background: none;
  }

  &:after {
    content: '';
    background: none;
    outline: none;
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${(props) => props.theme.palette.primary.main};
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  &:focus {
    background: none;
    outline: none;
    box-shadow: none;
    filter: drop-shadow(0 0 1rem ${(props) => props.theme.palette.primary.main}) 
    brightness(1.25);
    transition: filter 0.25s ease-out;
  }
`;

export default StyledButtonUnderline;