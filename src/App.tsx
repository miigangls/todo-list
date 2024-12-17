import {
  Routes,
  Route,
  Navigate,
  RouteProps as RouterRouteProps,
} from "react-router-dom";

import { Auth } from "./modules/Auth";
import { Register } from "./modules/Register";


type PrivateRouteProps = { children: JSX.Element } & RouterRouteProps;

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = true; // Cambia esto por tu lógica real de autenticación
  return isAuthenticated ? children : <Navigate to="/login" />;
}


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <h1>Hola Dashboard</h1>
          </PrivateRoute>
        }
      />
    </Routes>

  );
};

export default App
