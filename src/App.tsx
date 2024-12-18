import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Auth } from "./modules/Auth";
import { Register } from "./modules/Register";
import { Tasks } from "./modules/Tasks";
import useAuthenticated from "./hooks/useAuthenticated";

type GuardProps = { children: JSX.Element };

function PrivateRoute({ children }: GuardProps) {
  const { userId, loading } = useAuthenticated();
  const location = useLocation();

  if (loading) return null;
  if (!userId) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function PublicOnlyRoute({ children }: GuardProps) {
  const { userId, loading } = useAuthenticated();

  if (loading) return null;
  if (userId) return <Navigate to="/" replace />;
  return children;
}

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Auth />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
