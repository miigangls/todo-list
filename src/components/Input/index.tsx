import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { StyleInput, Label, FormItem } from './style';


interface InputProps extends ChakraInputProps {
    label?: string;
}

export default function Input(props: InputProps) {
    return (
        <FormItem>
            <Label htmlFor={props.id}>{props.label}</Label>
            <StyleInput  {...{ ...props, id: props.id }} />
        </FormItem>

    )
}
