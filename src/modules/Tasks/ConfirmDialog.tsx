import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Backdrop,
  DangerButton,
  Dialog,
  DialogActions,
  DialogText,
  DialogTitle,
  SecondaryButton,
} from "./style";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  busy,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !busy) onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, busy, onCancel]);

  if (!open) return null;

  return createPortal(
    <Backdrop
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !busy) onCancel();
      }}
    >
      <Dialog>
        <DialogTitle id="confirm-title">{title}</DialogTitle>
        <DialogText>{message}</DialogText>
        <DialogActions>
          <SecondaryButton type="button" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </SecondaryButton>
          <DangerButton
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Eliminando…" : confirmLabel}
          </DangerButton>
        </DialogActions>
      </Dialog>
    </Backdrop>,
    document.body,
  );
};

export default ConfirmDialog;
