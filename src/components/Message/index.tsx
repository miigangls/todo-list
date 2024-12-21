import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { MessageBox, type MessageVariant } from "./style";

type MessageProps = {
  variant?: MessageVariant;
  children: ReactNode;
  showIcon?: boolean;
};

const ICONS: Record<MessageVariant, typeof Info> = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
};

export default function Message({
  variant = "info",
  children,
  showIcon = true,
}: MessageProps) {
  const Icon = ICONS[variant];
  return (
    <MessageBox
      $variant={variant}
      role={variant === "error" ? "alert" : "status"}
    >
      {showIcon && <Icon size={16} />}
      <span>{children}</span>
    </MessageBox>
  );
}

export type { MessageVariant };
