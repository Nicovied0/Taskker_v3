import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./Auth.css";
import { Link } from "react-router-dom";

const Auth: React.FC = () => {
  const handleAuthSubmit = (email: string, password: string) => {
    // Aquí puedes manejar la lógica de autenticación, por ejemplo, enviar una solicitud al servidor
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div
      id="main-content"
      style={{
        backgroundColor: "white",
        height: "100vh",
        color: "#343434",
        overflowY: "auto",
      }}
    >
      <div>
        <Link to="/">
          <h2 className="titles">Taskker</h2>
        </Link>
        <div className="bodyauth">
          <AuthForm onSubmit={handleAuthSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
