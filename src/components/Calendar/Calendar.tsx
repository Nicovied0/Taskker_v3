import {
  Eventcalendar,
  getJson,
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscEventClickEvent,
  localeEs,
  setOptions,
  Toast,
  Button,
  Popup,
} from "@mobiscroll/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { deleteTask } from "../../core/services/Task.service";
import AddTask from "../AddTask/AddTask";
import { getIdUser } from "../../core/services/Profile.service";

setOptions({
  locale: localeEs,
  theme: "ios",
  themeVariant: "light",
});

const Calendar: FC = () => {
  const [myEvents, setEvents] = useState<MbscCalendarEvent[]>([]);
  const [isToastOpen, setToastOpen] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const myView = useMemo<MbscEventcalendarView>(
    () => ({
      schedule: { type: "week" },
    }),
    []
  );

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args: any) => {
    setSelectedEvent(args.event);
    setPopupOpen(true);
  }, []);

  const handleEditEvent = useCallback(() => {
    console.log("Editar evento:", selectedEvent);
    setPopupOpen(false);
    showToast("Evento editado");
  }, [selectedEvent]);

  const handleDeleteEvent = useCallback(() => {
    const updatedEvents = myEvents.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    deleteTask(selectedEvent._id)
      .then(() => {
        setPopupOpen(false);
        showToast("Evento eliminado");
      })
      .catch((error) => {
        console.error("Error al eliminar el evento:", error);
      });
  }, [myEvents, selectedEvent]);

  const showToast = (message: string) => {
    setToastText(message);
    setToastOpen(true);
  };

  useEffect(() => {
    const userId = getIdUser();
    if (userId) {
      const apiUrl = `http://localhost:3001/task/user/${userId}`;
      console.log(apiUrl);
      getJson(apiUrl, (events: MbscCalendarEvent[]) => {
        setEvents(events);
      });
    }
  }, []);

  return (
    <>
      <Eventcalendar
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        eventDelete={true}
        data={myEvents}
        view={myView}
        onEventClick={handleEventClick}
      />
      {selectedEvent && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          display="center"
        >
          <div>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description}</p>
            <p>{selectedEvent.status}</p>
            <Button onClick={handleEditEvent}>Editar</Button>
            <Button onClick={handleDeleteEvent}>Eliminar</Button>
          </div>
        </Popup>
      )}

      <AddTask></AddTask>
    </>
  );
};

export default Calendar;
