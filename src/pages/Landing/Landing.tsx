import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";

const Landing: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
       
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonContent className="ion-padding">
          Tap the button in the toolbar to open the menu.
        </IonContent>
      </IonPage>
    </>
  );
};
export default Landing;
