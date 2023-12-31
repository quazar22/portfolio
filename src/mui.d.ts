import { PaletteColorOptions } from "@mui/material/styles";
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    customPalette?: PaletteColor;
    additionalText?: PaletteColor;
  }
  interface PaletteOptions {
    customPalette?: PaletteColorOptions;
    additionalText?: PaletteColorOptions;
  }
}