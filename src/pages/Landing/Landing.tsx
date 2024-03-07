import React from "react";
import { IonContent, IonPage, IonMenu } from "@ionic/react";
import Footer from "../../components/Footer/Footer";

const Landing: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <div style={{ backgroundColor: "white",height:"100vh",color:"#343434"}}>
          <div className="ion-padding">
            Tap the button in the toolbar to open the menu.
          </div>
        </div>
        <Footer />
      </IonPage>
    </>
  );
};

export default Landing;
