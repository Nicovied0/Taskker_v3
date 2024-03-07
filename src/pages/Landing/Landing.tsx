import React from "react";
import { IonContent, IonPage, IonMenu } from "@ionic/react";
import Footer from "../../components/Footer/Footer";
import { Button } from "@mobiscroll/react";
import Principal from "../../components/Principal/Principal";

const Landing: React.FC = () => {
  return (
    <div
      id="main-content"
      style={{ backgroundColor: "white", height: "100vh", color: "#343434" }}
    >
      <div  >
        <h2 style={{ fontSize: "2rem",margin:"0", padding:"1rem 3rem" }}>Taskker</h2>
        <Principal></Principal>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;

