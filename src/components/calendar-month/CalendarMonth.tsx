import "./CalendarMonth.css";
import { Eventcalendar, getJson, setOptions, Toast, localeEs, Popup, Button } from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ContainerProps {}

setOptions({
  locale: localeEs,
  theme: "ios",
  themeVariant: "light",
  responsive: {
    xsmall: {
      view: {
        calendar: {
          type: 'week'
        },
        agenda: {
          type: 'day'
        }
      }
    },
    small: {
      view: {
        calendar: {
          type: 'week'
        },
        agenda: {
          type: 'day'
        }
      }
    },
    custom: { // Custom breakpoint
      breakpoint: 600,
      view: {
        calendar: { 
          labels: true,
        }
      }
    }
  }
});

const CalendarMonth: React.FC<ContainerProps> = () => {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState<string | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args: any) => {
    setSelectedEvent(args.event);
    setPopupOpen(true);
  }, []);

  const handleEditEvent = useCallback(() => {
    // Aquí puedes implementar la lógica para editar el evento
    console.log('Editar evento:', selectedEvent);
    setPopupOpen(false);
    showToast('Evento editado');
  }, [selectedEvent]);

  const handleDeleteEvent = useCallback(() => {
    // Eliminar el evento
    const updatedEvents = myEvents.filter((event) => event !== selectedEvent);
    setEvents(updatedEvents);
    setPopupOpen(false);
    showToast('Evento eliminado');
  }, [myEvents, selectedEvent]);

  const showToast = (message: string) => {
    setToastText(message);
    setToastOpen(true);
  };

  const myView = useMemo(() => ({ calendar: { labels: true } }), []);

  useEffect(() => {
    getJson(
      'https://taskker-back.vercel.app/task',
      (events) => {
        setEvents(events);
        console.log(events)
      },
    );
  }, []);

  return (
    <>
      <Eventcalendar
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={false}
        eventDelete={true}
        data={myEvents}
        view={myView}
        onEventClick={handleEventClick}
      />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleToastClose} />
      {selectedEvent && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          display="center"
        >
          <div>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description}</p>
            <Button onClick={handleEditEvent}>Editar</Button>
            <Button onClick={handleDeleteEvent}>Eliminar</Button>
          </div>
        </Popup>
      )}
    </>
  );
};

export default CalendarMonth;
