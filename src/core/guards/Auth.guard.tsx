import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface AuthGuardProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  isAuthenticated,
  authenticationPath,
  ...rest
}) => {
  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la ruta de autenticación
    return <Redirect to={{ pathname: authenticationPath }} />;
  }

  // Si el usuario está autenticado, renderiza el componente de la ruta original
  return <Route {...rest} />;
};

export default AuthGuard;
