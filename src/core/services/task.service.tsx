import HTTP_BASE_URL from "../../constants/HttpConstant";
import { getUserDataFromLocalStorage } from "./Profile.service";

const apiUrl = HTTP_BASE_URL + "/task";

export const createTask = async (data: any) => {
  try {
    const userCreatorId = getUserDataFromLocalStorage()?.id;

    if (!userCreatorId) {
      throw new Error(
        "No se pudo obtener el ID del usuario creador desde el almacenamiento local."
      );
    }
    console.log(userCreatorId);

    data.usercreator = userCreatorId;
    console.log(data);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error al crear tarea: ${response.statusText}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error: any) {
    throw new Error("Error al crear la tarea: " + error.message);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la tarea: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    // Especificar el tipo de error como 'any'
    throw new Error("Error al eliminar la tarea: " + error.message);
  }
};
