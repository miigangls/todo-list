const EMAIL_RE =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type ValidationResult = { error: boolean; message?: string };

export function validateEmail(value: string): ValidationResult {
  if (!value) return { error: true, message: "El Email es obligatorio" };
  if (!EMAIL_RE.test(value)) return { error: true, message: "Email no válido" };
  return { error: false };
}

export function filter<T extends { status: unknown }>(data: T[], value: string): T[] {
  if (value !== "all" && value !== "") {
    return data.filter(({ status }) => String(status) === value);
  }
  return data;
}
