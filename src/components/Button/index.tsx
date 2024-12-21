import type { ButtonHTMLAttributes } from "react";
import { StyleButton } from "./style";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return <StyleButton {...props} />;
}
