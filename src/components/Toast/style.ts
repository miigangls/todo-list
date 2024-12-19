import styled, { css, keyframes } from "styled-components";
import type { MessageVariant } from "../Message/style";

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const palette: Record<
  MessageVariant,
  { bg: string; border: string; color: string }
> = {
  error: { bg: "#fee2e2", border: "#fecaca", color: "#b91c1c" },
  success: { bg: "#dcfce7", border: "#bbf7d0", color: "#166534" },
  info: { bg: "#dbeafe", border: "#bfdbfe", color: "#1e40af" },
  warning: { bg: "#fef3c7", border: "#fde68a", color: "#92400e" },
};

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
  max-width: calc(100vw - 48px);
  width: 360px;

  @media (max-width: 480px) {
    left: 16px;
    right: 16px;
    bottom: 16px;
    width: auto;
  }
`;

export const ToastBox = styled.div<{ $variant: MessageVariant }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.18s ease-out;

  ${({ $variant }) => {
    const c = palette[$variant];
    return css`
      background: ${c.bg};
      border: 1px solid ${c.border};
      color: ${c.color};
    `;
  }}
`;

export const ToastBody = styled.span`
  flex: 1;
  line-height: 1.35;
`;

export const ToastClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
  border-radius: 4px;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.06);
  }
`;
