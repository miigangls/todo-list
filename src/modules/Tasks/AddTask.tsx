import { useState } from "react";
import { Formik, type FormikHelpers } from "formik";
import { Plus } from "lucide-react";

import { AddButton, AddForm, AddInput, ErrorBox } from "./style";

type AddTaskValues = { name: string };

const initialValues: AddTaskValues = { name: "" };

function validate(values: AddTaskValues) {
  const errors: Partial<Record<keyof AddTaskValues, string>> = {};
  if (!values.name.trim()) errors.name = "Escribe una tarea";
  else if (values.name.trim().length > 200)
    errors.name = "Máximo 200 caracteres";
  return errors;
}

type AddTaskProps = {
  onAdd: (name: string) => Promise<void>;
  disabled?: boolean;
};

const AddTask = ({ onAdd, disabled }: AddTaskProps) => {
  const [submitError, setSubmitError] = useState<string>("");

  async function handleSubmit(
    values: AddTaskValues,
    helpers: FormikHelpers<AddTaskValues>,
  ) {
    setSubmitError("");
    try {
      await onAdd(values.name);
      helpers.resetForm();
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "No se pudo agregar la tarea",
      );
    } finally {
      helpers.setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        dirty,
      }) => (
        <>
          <AddForm onSubmit={handleSubmit} noValidate>
            <AddInput
              name="name"
              type="text"
              placeholder="Ingresa una nueva tarea"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled || isSubmitting}
              autoFocus
              maxLength={200}
              aria-label="Nueva tarea"
            />
            <AddButton
              type="submit"
              disabled={disabled || isSubmitting || !dirty || !isValid}
              aria-label="Agregar tarea"
              title="Agregar"
            >
              <Plus size={18} />
            </AddButton>
          </AddForm>
          {submitError && <ErrorBox>{submitError}</ErrorBox>}
        </>
      )}
    </Formik>
  );
};

export default AddTask;
