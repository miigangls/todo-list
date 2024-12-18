import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";

export type UseComponentsResult<T extends Record<string, unknown>> = {
  useValues: T;
  useSubmit: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleClear: (key: keyof T) => void;
  reset: () => void;
};

/**
 * Port histórico del hook `useComponents` de v1.0.0.
 * En v2 los formularios usan Formik; este hook se mantiene por paridad
 * y para casos puntuales fuera de un <Formik>.
 */
function useComponents<T extends Record<string, unknown>>(
  initialState: T,
): UseComponentsResult<T> {
  const [useValues, setValues] = useState<T>(initialState);
  const [useSubmit, setSubmit] = useState<boolean>(false);

  const handleChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
  }, []);

  const handleClear = useCallback((key: keyof T) => {
    setValues((prev) => ({ ...prev, [key]: "" as T[keyof T] }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialState);
    setSubmit(false);
  }, [initialState]);

  return {
    useValues,
    useSubmit,
    handleChange,
    handleSubmit,
    handleClear,
    reset,
  };
}

export default useComponents;
