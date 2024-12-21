import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import type { MessageVariant } from "../Message/style";
import { ToastContext, type ToastContextValue } from "./context";
import { ToastBody, ToastBox, ToastClose, ToastContainer } from "./style";

type Toast = {
  id: number;
  variant: MessageVariant;
  message: string;
};

const ICONS: Record<MessageVariant, typeof Info> = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
};

const DEFAULT_DURATION_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (variant: MessageVariant, message: string, durationMs?: number) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, variant, message }]);
      const ms = durationMs ?? DEFAULT_DURATION_MS;
      if (ms > 0) {
        window.setTimeout(() => dismiss(id), ms);
      }
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (m, d) => show("success", m, d),
      error: (m, d) => show("error", m, d),
      info: (m, d) => show("info", m, d),
      warning: (m, d) => show("warning", m, d),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <ToastContainer aria-live="polite" aria-atomic="false">
          {toasts.map((t) => {
            const Icon = ICONS[t.variant];
            return (
              <ToastBox
                key={t.id}
                $variant={t.variant}
                role={t.variant === "error" ? "alert" : "status"}
              >
                <Icon size={18} />
                <ToastBody>{t.message}</ToastBody>
                <ToastClose
                  type="button"
                  aria-label="Cerrar notificación"
                  onClick={() => dismiss(t.id)}
                >
                  <X size={14} />
                </ToastClose>
              </ToastBox>
            );
          })}
        </ToastContainer>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

