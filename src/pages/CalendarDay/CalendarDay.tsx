import React, { useState, useEffect } from "react";
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
  IonList,
  IonRouterLink,
} from "@ionic/react";
import { calendarOutline, calendarSharp, menuOutline } from "ionicons/icons";
import "./CalendarDay.css";
import { Link } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";

const CalendarDay: React.FC = () => {
  const [selectedCalendar, setSelectedCalendar] = useState<"month" | "day">(
    "month"
  );
  const [showMenu, setShowMenu] = useState(false);

  const handleCalendarChange = (calendar: "month" | "day") => {
    setSelectedCalendar(calendar);
    console.log(calendar);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const ionMenu = document.querySelector("ion-menu");

      if (!ionMenu?.contains(target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <div>
              <IonButtons slot="end">
                <IonTitle>Taskker</IonTitle>
              </IonButtons>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonRouterLink routerLink="/home">Settings</IonRouterLink>
            </IonItem>
            <IonItem>
              <IonRouterLink routerLink="/profile">Profile</IonRouterLink>
            </IonItem>
            <IonItem>
              <IonRouterLink routerLink="/">Home</IonRouterLink>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar style={{ flex: "1" }}>
            <div className="divHeader">
              <IonButtons slot="end">
                <IonTitle>Taskker</IonTitle>
              </IonButtons>

              <div className="hederStructure">
                <Link to="/home">
                  <IonIcon
                    color="secondary"
                    icon={
                      selectedCalendar === "month"
                        ? calendarSharp
                        : calendarOutline
                    }
                    onClick={() => handleCalendarChange("month")}
                    style={{ marginRight: "10px" }}
                  />
                </Link>

                <Link to="/home/day">
                  <IonIcon
                    icon={
                      selectedCalendar === "day"
                        ? calendarSharp
                        : calendarOutline
                    }
                    onClick={() => handleCalendarChange("day")}
                  />
                </Link>
              </div>

              <IonButtons slot="start">
                <div className="hederStructure menu">
                  <IonMenuButton
                    autoHide={false}
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <IonIcon icon={menuOutline} />
                  </IonMenuButton>
                </div>
              </IonButtons>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Calendar></Calendar>
        </IonContent>
      </IonPage>
    </>
  );
};

export default CalendarDay;
