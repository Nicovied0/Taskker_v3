import HTTP_BASE_URL from "../../constants/HttpConstant";
import { getUserDataFromLocalStorage } from "./Profile.service";
const apiUrl = HTTP_BASE_URL + "/task";

const createTask = async (data: any) => {
  try {
    // Obtenemos el ID del usuario creador desde el almacenamiento local
    const userCreatorId = getUserDataFromLocalStorage()?.id;

    // Verificamos si el ID del usuario creador se obtuvo correctamente
    if (!userCreatorId) {
      throw new Error("No se pudo obtener el ID del usuario creador desde el almacenamiento local.");
    }
    console.log(userCreatorId)

    // Agregamos el ID del usuario creador a los datos de la tarea
    data.userCreatorId = userCreatorId;
console.log(data)
    // Realizamos la solicitud POST al API
    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // });

    // if (!response.ok) {
    //   throw new Error(`Error al crear tarea: ${response.statusText}`);
    // }

    // // Convertimos la respuesta a formato JSON
    // const responseData = await response.json();

    // // Retornamos los datos de la tarea creada
    // return responseData;
  } catch (error: any) {
    // Capturamos y manejamos cualquier error que ocurra durante el proceso
    throw new Error("Error al crear la tarea: " + error.message);
  }
};
const deleteTask = async (id: string) => {
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

export { createTask,deleteTask };
