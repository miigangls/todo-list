import React from 'react';
import { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

import { StyleButton } from './style';


interface ButtonProps extends ChakraButtonProps {
}

export default function Button(props: ButtonProps) {
  return (
    <StyleButton {...props} />
  )
}
