import React, { useState } from "react";
import "./AuthForm.css";
import { login, register } from "../../core/services/Auth.service";

interface AuthFormProps {
  onSubmit: (email: string, password: string, name?: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (isRegistering && name) {
        await register({ email, password, name });
      } else {
        await login({ email, password });
      }

      onSubmit(email, password, isRegistering ? name : undefined);
      window.location.href = "/home";
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    validateData();
  }, [email, password, name, isRegistering]);

  const validateData = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 5;
    setIsValid(
      isEmailValid && isPasswordValid && (!isRegistering || name !== "")
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        {isRegistering && (
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                background: "white",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              background: "white",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              background: "white",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>
      <div className="inputsbuton">
        <button
          type="submit"
          style={{
            backgroundColor: isValid ? "#007bff" : "#ccc",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
          disabled={!isValid || isLoading}
        >
          {!isLoading && <>{isRegistering ? "Registrarse" : "Loguearse"}</>}
          {isLoading && (
            <div className="divLoader">
              <span className="loader"></span>
            </div>
          )}
        </button>
        <div
          style={{
            marginTop: "0.5rem",
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          {isRegistering ? "Ya tienes una cuenta? " : "No tienes una cuenta? "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Logueate" : "Regístrate"}
          </span>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
