import React, { useState } from "react";
import "./TaskForm.css";
import { createTask } from "../../core/services/Task.service";

const TaskForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [butonActive, setButonActive] = useState(false);

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
      setButonActive(false)
      throw new Error(
        "La fecha y hora de fin deben ser posteriores a la fecha y hora de inicio."
      );
    } else {
      setButonActive(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const taskData = {
        title: title,
        description: description,
        start: startDateTime + ":00",
        end: endDateTime + ":00",
      };

      const createdTask = await createTask(taskData);

      console.log("Tarea creada:", createdTask);
      closeModal();
      window.location.reload()
    } catch (error: any) {
      console.error("Error al crear la tarea:", error.message);
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
        <label htmlFor="title">Descripcion:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Url:</label>
        <input
          type="text"
          id="meetingUrl"
          value={meetingUrl}
          onChange={handleMeetingUrlChange}
          required
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
        {!butonActive ? (
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
