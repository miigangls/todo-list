import styled from "styled-components";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

export const StyleButton = styled(ChakraButton)<
  ChakraButtonProps | HTMLButtonElement
>`
  height: 60px;
  border-radius: 10px !important;
`;
