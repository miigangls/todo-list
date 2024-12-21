import styled from "styled-components";

export const StyleButton = styled.button`
  height: 60px;
  border-radius: 10px;
  border: none;
  background: #0d9488;
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: #0f766e;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
