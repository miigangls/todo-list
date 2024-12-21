import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

import { StyleButton } from './style';

export default function Button(props: ChakraButtonProps) {
  return <StyleButton {...props} />;
}
