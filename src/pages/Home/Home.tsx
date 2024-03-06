import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { calendarOutline, calendarSharp } from "ionicons/icons";
import "./Home.css";
import CalendarMonth from "../../components/calendar-month/CalendarMonth";

const Home: React.FC = () => {
  const [selectedCalendar, setSelectedCalendar] = useState<"month" | "day">(
    "month"
  );

  const handleCalendarChange = (calendar: "month" | "day") => {
    setSelectedCalendar(calendar);
    console.log(calendar);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonTitle>Calendar</IonTitle>
          </IonButtons>

          <div style={{ flex: "1", textAlign: "center" }}>
            <Link to="/home">
              <IonIcon
                color="secondary"
                icon={
                  selectedCalendar === "month" ? calendarSharp : calendarOutline
                }
                onClick={() => handleCalendarChange("month")}
                style={{ marginRight: "10px" }}
              />
            </Link>

            <Link to="/home/day">
              <IonIcon
                icon={
                  selectedCalendar === "day" ? calendarSharp : calendarOutline
                }
                onClick={() => handleCalendarChange("day")}
              />
            </Link>
          </div>
          <IonButtons slot="end">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank </IonTitle>
          </IonToolbar>
        </IonHeader>
        <CalendarMonth></CalendarMonth>
      </IonContent>
    </IonPage>
  );
};

export default Home;
