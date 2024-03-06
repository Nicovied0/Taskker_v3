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
import { calendarOutline, calendarSharp } from "ionicons/icons";
import "./Home.css";
import { Link } from "react-router-dom";

const CalendarDay: React.FC = () => {
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
            <IonTitle>Calendar Day</IonTitle>
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
        <CalendarDay></CalendarDay>
      </IonContent>
    </IonPage>
  );
};

export default CalendarDay;
