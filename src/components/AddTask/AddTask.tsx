import React, { useState } from "react";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import TaskForm from "../TaskForm/TaskForm";


const AddTask: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

  };

  
  
  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={handleOpenModal}>
          <IonIcon icon={add} className="icon" />
        </IonFabButton>
      </IonFab>

      <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Crear Tarea</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TaskForm closeModal={handleCloseModal} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default AddTask;
