import Button from '../../components/Button';
import Input from '../../components/Input';
import Typography from '../../components/Typography';
import { Wrapper } from "./style";

const Auth = () => {
  return (
    <Wrapper>
      <Typography type-element={"TitleLarge"} >Inicia sesión en nuestra plataforma</Typography>
      <Input label="Email" id="email" type="email" placeholder="email address" />
      <Input label="Contraseña" id="password" type={"password"} placeholder="Contraseña" />
      <Button
        borderRadius={0}
        type="submit"
        variant="solid"
        colorScheme="teal"
        width="full"
        onClick={() => console.log("login")}
      >
        Aceptar
      </Button>
    </Wrapper>
  );
};

export default Auth;
