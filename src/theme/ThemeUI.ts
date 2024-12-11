import { fontSizes } from "./base/variables";
import { ITheme, IMultiplesTheme } from "./interfaces/ITheme";

const defaultTheme: ITheme = {
  brand: {
    primaryMain: "#262626",
    primaryDark: "#000000",
    secondaryMain: "#fafafa",
  },
  fontSizes,
};

export const theme: IMultiplesTheme = {
  default: defaultTheme,
};
