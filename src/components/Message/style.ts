import styled, { css } from "styled-components";

export type MessageVariant = "error" | "success" | "info" | "warning";

const palette: Record<
  MessageVariant,
  { bg: string; border: string; color: string }
> = {
  error: { bg: "#fee2e2", border: "#fecaca", color: "#b91c1c" },
  success: { bg: "#dcfce7", border: "#bbf7d0", color: "#166534" },
  info: { bg: "#dbeafe", border: "#bfdbfe", color: "#1e40af" },
  warning: { bg: "#fef3c7", border: "#fde68a", color: "#92400e" },
};

export const MessageBox = styled.div<{ $variant: MessageVariant }>`
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ $variant }) => {
    const c = palette[$variant];
    return css`
      background: ${c.bg};
      border: 1px solid ${c.border};
      color: ${c.color};
    `;
  }}
`;
