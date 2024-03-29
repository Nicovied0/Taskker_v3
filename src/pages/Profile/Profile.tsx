import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { IonRouterLink } from "@ionic/react";

const Profile: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the menu content.
          <IonList>
            <IonItem>
              <IonRouterLink routerLink="/home">Home</IonRouterLink>
            </IonItem>
            <IonItem>
              <IonRouterLink routerLink="/profile">Profile</IonRouterLink>
            </IonItem>
            <IonItem>
              <IonRouterLink routerLink="/settings">Settings</IonRouterLink>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>menu</h2>
        </IonContent>
      </IonPage>
    </>
  );
};
export default Profile;
