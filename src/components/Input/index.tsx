import type { InputHTMLAttributes } from "react";
import { StyleInput, Label, FormItem } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, id, ...rest }: InputProps) {
  return (
    <FormItem>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyleInput id={id} {...rest} />
    </FormItem>
  );
}
