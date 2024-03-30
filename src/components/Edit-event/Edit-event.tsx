import { Button } from "@mobiscroll/react";
import React, { useState } from "react";
import "./Edit-event.css";

const EditEvent: React.FC<{
  event: any;
  onSave: (updatedEvent: any) => void;
  onCancel: () => void;
}> = ({ event, onSave, onCancel }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [status, setStatus] = useState(event.status);
  const [meetingUrl, setMeetingUrl] = useState(event.meetingUrl);

  const handleSave = () => {
    const updatedEvent = { ...event, title, description, status };
    console.log(updatedEvent);
    onSave(updatedEvent);
    onCancel();
  };

  const statusOptions = [
    { value: "Agendada", label: "Agendada" },
    { value: "En proceso", label: "En proceso" },
    { value: "Cancelada", label: "Cancelada" },
    { value: "Realizada", label: "Realizada" },
    { value: "Alerta", label: "Alerta" },
  ];

  return (
    <div>
      <h3 className="title">Editar Evento</h3>
      <div>
        <label>Titulo:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="inputs"
        />
      </div>
      <div>
        <label>Descripcion:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="inputs"
        />
      </div>
      <div>
        <label>Url reunion:</label>
        <input
          type="text"
          value={meetingUrl}
          onChange={(e) => setMeetingUrl(e.target.value)}
          className="inputs"
        />
      </div>
      <div>
        <label>Estado:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="inputs"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleSave}>Guardar</Button>

      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default EditEvent;
