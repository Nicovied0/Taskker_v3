import React, { useState } from "react";
import "./TaskForm.css";
import { createTask } from "../../core/services/Task.service";

const TaskForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

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
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Aquí puedes realizar alguna acción con los datos ingresados, como enviarlos a tu backend
      console.log("Título:", title);
      console.log("Descripción:", description);
      console.log("Fecha y hora de inicio:", startDateTime + ":00");
      console.log("Fecha y hora de fin:", endDateTime + ":00");

      // Crear un objeto con los datos de la tarea
      const taskData = {
        title: title,
        description: description,
        startDateTime: startDateTime + ":00",
        endDateTime: endDateTime + ":00",
      };

      // Llamar a la función createTask y pasarle los datos de la tarea
      const createdTask = await createTask(taskData);

      // Realizar alguna acción con la tarea creada, si es necesario
      console.log("Tarea creada:", createdTask);
    } catch (error: any) {
      // Manejar errores de creación de tarea
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
        <button type="submit" className="save-button">
          Guardar
        </button>
        <button type="button" className="cancel-button" onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
