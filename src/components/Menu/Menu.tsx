import React from "react";
import { IonList, IonItem, IonRouterLink } from "@ionic/react";

const Menu: React.FC = () => {
  return (
    <IonList>
      <IonItem>
        <IonRouterLink routerLink="/home">Home</IonRouterLink>
      </IonItem>
      <IonItem>
        <IonRouterLink routerLink="/profile">Profile</IonRouterLink>
      </IonItem>
    </IonList>
  );
};

export default Menu;
