import React from "react";
import { IonList, IonItem, IonRouterLink } from "@ionic/react";

const Footer: React.FC = () => {
  return (
    <div
      className="footer"
      style={{ backgroundColor: "#f2f4f6", color: "#212529",padding:"20px" }}
    >
      <div className="footer__texts">
        <div className="footer__texts-grup">
          <div>
            <div
              style={{
                textAlign: "center",
                color: "#212529",
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <a href="https://notech-company.vercel.app" target="_blank">
                <img
                  src="https://notech-company.vercel.app/assets/icons/notechblack.png"
                  className="footer__imagenes-img"
                  style={{ height: "50px" }}
                />
              </a>
              <p>contacto.notech@gmail.com</p>
            </div>
          </div>
          <div className="footer__imagenes"></div>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>© Taskker 2024. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
