const fetchData = async () => {
    try {
        const response = await fetch("../../assets/mocks/financePersonal.mook.json");
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Extraer el cuerpo de la respuesta como JSON
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propaga el error para que pueda ser manejado por el código que llama a fetchData
    }
};

export { fetchData };


const data = [
    {
      "title": "Organizada y escalable",
      "text": "Simplifica tu día a día, maximiza tu productividad y haz realidad tus proyectos con Tasker.",
      "urlImg": "https://assets-global.website-files.com/6455bb365e4a439e59c71b72/648bcedbb6077e9ed6d3201a_icn-2.svg"
    },
    {
      "title": "Versátil",
      "text": "La herramienta versátil que simplifica la gestión de tareas diarias, ofreciendo eficiencia y facilidad en cada paso.",
      "urlImg": "https://assets-global.website-files.com/6455bb365e4a439e59c71b72/648bcedb23f53111574c24c8_icn-3.svg"
    },
    {
      "title": "Segura",
      "text": "Nos tomamos en serio la seguridad y mantenemos sus datos personales seguros. Todos sus datos están cifrados y protegidos.",
      "urlImg": "https://assets-global.website-files.com/6455bb365e4a439e59c71b72/648bcedbbe88fa270a3757b9_icn-7.svg"
    },
    {
      "title": "Sincronizado",
      "text": "No importa qué dispositivo esté utilizando, todos sus datos estarán sincronizados y listos para usar en su teléfono inteligente, tableta o computadora.",
      "urlImg": "https://assets-global.website-files.com/6455bb365e4a439e59c71b72/648bcedba5a1cb67b139a70d_icn-6.svg"
    }
  ]