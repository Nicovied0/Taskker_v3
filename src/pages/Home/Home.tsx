import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import CalendarMonth from '../../components/calendar-month/CalendarMonth';
import CalendarWeek from '../../components/calendar-week/CalendarWeek';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CalendarMonth></CalendarMonth>
        {/* <CalendarWeek/> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
