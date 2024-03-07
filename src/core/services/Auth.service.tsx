import HTTP_BASE_URL from "../../constants/HttpConstant";
const apiUrl = HTTP_BASE_URL + "/auth";

const login = async (data: any) => {
  try {
    const response = await fetch(apiUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al iniciar sesión: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    // Almacenar el token en localStorage
    localStorage.setItem("authToken", responseData.token);
    console.log(responseData.token);
    // Obtener el perfil del usuario utilizando el token
    const profileResponse = await fetchUserProfile(responseData.token);

    // Almacenar el perfil del usuario en localStorage
    localStorage.setItem("userData", JSON.stringify(profileResponse.profile));

    return responseData;
  } catch (error: any) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};

const register = async (data: any) => {
  try {
    const response = await fetch(apiUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al registrar: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    throw new Error("Error al registrar: " + error.message);
  }
};

const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
};

const fetchUserProfile = async (token: string) => {
  try {
    const response = await fetch(apiUrl + "/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error al obtener perfil de usuario: ${response.statusText}`
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    throw new Error("Error al obtener perfil de usuario: " + error.message);
  }
};

export { login, register, logout };
