import "styled-components";
import type { ITheme } from "./interfaces/ITheme";

declare module "styled-components" {
  export type DefaultTheme = ITheme;
}
