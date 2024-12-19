import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Card, Code, Description, HomeLink, Page, Title } from "./style";

const NotFound = () => {
  return (
    <Page>
      <Card>
        <Code>404</Code>
        <Title>Página no encontrada</Title>
        <Description>
          La ruta a la que intentaste acceder no existe o fue movida.
        </Description>
        <HomeLink as={Link} to="/">
          <Home size={16} />
          Volver al inicio
        </HomeLink>
      </Card>
    </Page>
  );
};

export default NotFound;
