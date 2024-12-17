import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, type FormikHelpers } from "formik";
import { FirebaseError } from "firebase/app";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { register } from "../../firebase";
import { validateEmail } from "../../utils";
import {
  Wrapper,
  Form,
  ErrorMessage,
  FieldError,
  FooterLink,
} from "./style";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

const initialValues: RegisterValues = { name: "", email: "", password: "" };

function validate(values: RegisterValues) {
  const errors: Partial<Record<keyof RegisterValues, string>> = {};
  if (!values.name.trim()) errors.name = "El nombre es obligatorio";
  else if (values.name.trim().length < 2) errors.name = "Mínimo 2 caracteres";

  const emailCheck = validateEmail(values.email);
  if (emailCheck.error) errors.email = emailCheck.message;

  if (!values.password) errors.password = "La contraseña es obligatoria";
  else if (values.password.length < 6) errors.password = "Mínimo 6 caracteres";

  return errors;
}

function registerErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este email ya está registrado";
    case "auth/invalid-email":
      return "Email no válido";
    case "auth/weak-password":
      return "Contraseña muy débil";
    case "auth/network-request-failed":
      return "Error de red. Verifica tu conexión.";
    default:
      return "No se pudo crear la cuenta. Intenta nuevamente.";
  }
}

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");

  async function handleSubmit(
    values: RegisterValues,
    helpers: FormikHelpers<RegisterValues>,
  ) {
    setServerError("");
    try {
      await register(values.name.trim(), values.email, values.password);
      navigate("/", { replace: true });
    } catch (e) {
      const code = e instanceof FirebaseError ? e.code : "";
      setServerError(registerErrorMessage(code));
    } finally {
      helpers.setSubmitting(false);
    }
  }

  return (
    <Wrapper>
      <Typography type-element={"TitleLarge"}>Crear cuenta</Typography>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <div>
              <Input
                label="Nombre"
                id="name"
                name="name"
                type="text"
                placeholder="Nombre"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.name && errors.name && (
                <FieldError>{errors.name}</FieldError>
              )}
            </div>

            <div>
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.email && errors.email && (
                <FieldError>{errors.email}</FieldError>
              )}
            </div>

            <div>
              <Input
                label="Contraseña"
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.password && errors.password && (
                <FieldError>{errors.password}</FieldError>
              )}
            </div>

            {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              disabled={isSubmitting}
            >
              Crear cuenta
            </Button>

            <FooterLink>
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </FooterLink>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
