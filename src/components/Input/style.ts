import styled from "styled-components";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 0.5rem;
`;

export const StyleInput = styled(ChakraInput)<
  ChakraInputProps | HTMLInputElement
>`
  height: 60px;
  border-radius: 10px;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
  color: #0c0a09;
`;
