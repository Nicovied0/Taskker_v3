import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface AuthGuardProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  component: React.ComponentType<any>;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  isAuthenticated,
  authenticationPath,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: authenticationPath }} />
        )
      }
    />
  );
};

export default AuthGuard;
