const apiUrl = "https://example.com/api/tasks";

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
    } catch (error: any) { // Especificar el tipo de error como 'any'
      throw new Error("Error al eliminar la tarea: " + error.message);
    }
  };
  
  export { deleteTask };
  