import React, { useState } from "react";
import "./TaskForm.css";
import { createTask } from "../../core/services/Task.service.jsx";
import { format, addDays } from "date-fns";
import { generateCode } from "../../core/services/CodeRepeat.service.js";

const TaskForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [buttonActive, setButtonActive] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleMeetingUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMeetingUrl(event.target.value);
  };

  const handleStartDateTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDateTime(event.target.value);
  };

  const handleEndDateTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEndDateTime(event.target.value);
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (end <= start) {
      setButtonActive(false);
      throw new Error(
        "La fecha y hora de fin deben ser posteriores a la fecha y hora de inicio."
      );
    } else {
      setButtonActive(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);

      const days =
        Math.floor(
          (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
        ) + 1;

      let diaryEventCode = "";
      if (days > 1) {
        diaryEventCode = generateCode();
      }

      const events = Array.from({ length: days }, (_, index) => {
        const currentDate = addDays(startDate, index);
        const formattedStartDate = format(currentDate, "yyyy-MM-dd");

        let diaryEvent = false;
        if (days > 1) {
          diaryEvent = true;
        }

        return {
          title: title,
          description: description,
          start: formattedStartDate + "T" + startDateTime.split("T")[1] + ":00",
          end: formattedStartDate + "T" + endDateTime.split("T")[1] + ":00",
          diaryEvent: diaryEvent,
          codeOfRepeat: diaryEvent ? diaryEventCode : null, 
          meetingUrl:meetingUrl
        };
      });

      await Promise.all(events.map(createTask));

      console.log("Tareas creadas:", events);
      closeModal();
      window.location.reload();
    } catch (error: any) {
      console.error("Error al crear las tareas:", error.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="meetingUrl">Url:</label>
        <input
          type="url"
          id="meetingUrl"
          value={meetingUrl}
          onChange={handleMeetingUrlChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="startDateTime">Fecha y hora de inicio:</label>
        <input
          type="datetime-local"
          id="startDateTime"
          value={startDateTime}
          onChange={handleStartDateTimeChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDateTime">Fecha y hora de fin:</label>
        <input
          type="datetime-local"
          id="endDateTime"
          value={endDateTime}
          onChange={handleEndDateTimeChange}
          required
        />
      </div>
      <div className="form-buttons">
        {!buttonActive ? (
          <button type="submit" className="save-button2" disabled>
            Guardar
          </button>
        ) : (
          <button type="submit" className="save-button">
            Guardar
          </button>
        )}
        <button type="button" className="cancel-button" onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
