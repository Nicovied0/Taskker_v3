import React, { useState, useEffect, useMemo, useCallback } from "react";
import { format } from "date-fns";
import "./Calendar.css";
import {
  Eventcalendar,
  getJson,
  MbscCalendarEvent,
  MbscEventcalendarView,
  setOptions,
  Toast,
  Button,
  Popup,
} from "@mobiscroll/react";
import { deleteTask, updateTask } from "../../core/services/Task.service.jsx";
import AddTask from "../AddTask/AddTask";
import { getIdUser } from "../../core/services/Profile.service.jsx";
import HTTP_BASE_URL from "../../constants/HttpConstant.js";
import EditEvent from "../Edit-event/Edit-event.js";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const Calendar: React.FC = () => {
  const [myEvents, setEvents] = useState<MbscCalendarEvent[]>([]);
  const [isToastOpen, setToastOpen] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>();
  const [selectedEvent, setSelectedEvent] = useState<MbscCalendarEvent | null>(
    null
  );
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen2, setPopupOpen2] = useState(false);

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
    setPopupOpen2(true);
  }, []);

  const handleDeleteEvent = useCallback(() => {
    if (!selectedEvent) return;

    deleteTask(selectedEvent._id)
      .then(() => {
        setPopupOpen(false);
        showToast("Evento eliminado");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error: any) => {
        console.error("Error al eliminar el evento:", error);
      });
  }, [selectedEvent]);

  const showToast = (message: string) => {
    setToastText(message);
    setToastOpen(true);
  };

  useEffect(() => {
    const userId = getIdUser();
    if (userId) {
      const apiUrl = `${HTTP_BASE_URL}/task/user/${userId}`;
      console.log(apiUrl);
      getJson(apiUrl, (events: MbscCalendarEvent[]) => {
        console.log(events);
        setEvents(events);
      });
    }
  }, []);

  const handleEditSubmit = useCallback(
    async (editedEvent: MbscCalendarEvent) => {
      if (!selectedEvent) return;

      try {
        console.log(selectedEvent)
        const updatedEvent = await updateTask(selectedEvent._id, editedEvent);
        if (!updatedEvent) throw new Error("No se pudo actualizar el evento.");

        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );

        showToast("Evento editado correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("Error al editar el evento:", error);
        showToast("Error al editar el evento");
      } finally {
        setPopupOpen(false);
      }
    },
    [selectedEvent]
  );

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

      <Popup
        isOpen={isPopupOpen2}
        onClose={() => setPopupOpen2(false)}
        display="center"
        className="modal_edt"
      >
        <EditEvent
          event={selectedEvent}
          onSave={handleEditSubmit}
          onCancel={() => setPopupOpen2(false)}
        />
      </Popup>

      {selectedEvent && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          display="center"
        >
          <div>
            <h3>Titulo: {selectedEvent.title}</h3>
            <p>Descripcion: {selectedEvent.description}</p>
            <p>Estado: {selectedEvent.status}</p>
            <p>
              Fecha: Desde las {format(new Date(selectedEvent.start), " HH:mm")}{" "}
              hasta las {format(new Date(selectedEvent.end), " HH:mm")}.
            </p>
            <p>Url reunion: <a href={selectedEvent.meetingUrl} target="_blank">{selectedEvent.meetingUrl}</a> </p>
            <Button onClick={handleEditEvent}>Editar</Button>
            <Button onClick={handleDeleteEvent}>Eliminar</Button>
          </div>
        </Popup>
      )}

      <AddTask />
    </>
  );
};

export default Calendar;
