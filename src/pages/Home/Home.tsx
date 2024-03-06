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
import CalendarMonth from "../../components/calendar-month/CalendarMonth";
import CalendarDay from "../../components/calendar-day/CalendarDay";

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
          <IonButtons slot="start" >
            <IonTitle>Calendar</IonTitle>
          </IonButtons>

          <IonButtons >
            <div style={{ width: "120px", textAlign: "center" }}>
              <IonIcon
                color="secondary"
                icon={
                  selectedCalendar === "month" ? calendarSharp : calendarOutline
                }
                onClick={() => handleCalendarChange("month")}
                style={{ marginRight: "10px" }}
              />

              <IonIcon
                icon={
                  selectedCalendar === "day" ? calendarSharp : calendarOutline
                }
                onClick={() => handleCalendarChange("day")}
              />
            </div>
          </IonButtons>
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
        {selectedCalendar === "month" && <CalendarMonth></CalendarMonth>}
        {selectedCalendar === "day" && <CalendarDay></CalendarDay>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
