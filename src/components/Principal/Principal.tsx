import React from "react";
import Footer from "../../components/Footer/Footer";
import { Button } from "@mobiscroll/react";
import "./Principal.css"
import { Link } from "react-router-dom";
const Principal: React.FC = () => {
  return (
    <div className="container">
      <div
      className="div"
      >
        <div className="textTitle">
          <h2 className="title">Optimiza tu gestión de tareas con Taskker</h2>
          <p>
            La herramienta perfecta para crear, editar y manipular tareas de
            forma eficiente. Organiza tus proyectos y colabora con facilidad.
            Simplifica tu flujo de trabajo con Taskker. ¡Únete hoy mismo!
          </p>
          <Link to="/home">
          <Button style={{ backgroundColor: "#279efe", color: "white",margin:"0" }}>
            Empezar
          </Button>
          </Link>
        </div>
        <div className="textTitle">
          <img
            src="https://www.chanty.com/blog/wp-content/uploads/2020/10/Task-manager-apps-740x380.jpg"
           className="img"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Principal;
