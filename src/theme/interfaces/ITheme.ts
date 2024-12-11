export interface ITheme {
  brand: {
    primaryMain: string;
    primaryDark: string;
    secondaryMain: string;
  };
  fontSizes: {
    mainSize: string;
    secondsize: string;
  };
}

export interface IMultiplesTheme {
  default: ITheme;
}
