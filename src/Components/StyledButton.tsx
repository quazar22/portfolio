import styled from 'styled-components';
import Button from '@mui/material/Button';
import hexToRgbA from '../utils/hexToRgba';

const StyledButton = styled(Button)`
&& {
  background-color: transparent;
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
  // add border
  border-radius: 4px;  
  border: '1px solid ' + ${(props) => hexToRgbA(props.theme.palette.primary.main, 0.3)} !important;
  outline: '1px solid #69b95b';
  // remove box shadow


  &:hover {
    background-color: ${(props) => hexToRgbA(props.theme.palette.customPalette.dark, 0.3)};
  }

  &:after {
    
  }

  &:focus {
    
  }
`;

export default StyledButton;