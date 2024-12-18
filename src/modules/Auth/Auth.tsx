import { useState } from "react";
import { Link, useLocation, useNavigate, type Location } from "react-router-dom";
import { Formik, type FormikHelpers } from "formik";
import { FirebaseError } from "firebase/app";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { login } from "../../firebase";
import { validateEmail } from "../../utils";
import { Page, Wrapper, Form, ErrorMessage, FieldError, FooterLink } from "./style";

type LoginValues = {
  email: string;
  password: string;
};

const initialValues: LoginValues = { email: "", password: "" };

function validate(values: LoginValues) {
  const errors: Partial<Record<keyof LoginValues, string>> = {};
  const emailCheck = validateEmail(values.email);
  if (emailCheck.error) errors.email = emailCheck.message;
  if (!values.password) errors.password = "La contraseña es obligatoria";
  else if (values.password.length < 6)
    errors.password = "Mínimo 6 caracteres";
  return errors;
}

function authErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email o contraseña incorrectos";
    case "auth/too-many-requests":
      return "Demasiados intentos. Intenta más tarde.";
    case "auth/network-request-failed":
      return "Error de red. Verifica tu conexión.";
    default:
      return "No se pudo iniciar sesión. Intenta nuevamente.";
  }
}

type LocationState = { from?: Location } | null;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string>("");

  async function handleSubmit(
    values: LoginValues,
    helpers: FormikHelpers<LoginValues>,
  ) {
    setServerError("");
    try {
      await login(values.email, values.password);
      const state = location.state as LocationState;
      const target = state?.from?.pathname ?? "/";
      navigate(target, { replace: true });
    } catch (e) {
      const code = e instanceof FirebaseError ? e.code : "";
      setServerError(authErrorMessage(code));
    } finally {
      helpers.setSubmitting(false);
    }
  }

  return (
    <Page>
    <Wrapper>
      <Typography type-element={"TitleLarge"}>
        Inicia sesión en nuestra plataforma
      </Typography>

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
              Aceptar
            </Button>

            <FooterLink>
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </FooterLink>
          </Form>
        )}
      </Formik>
    </Wrapper>
    </Page>
  );
};

export default Auth;
