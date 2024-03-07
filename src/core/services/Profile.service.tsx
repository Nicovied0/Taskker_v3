

function getUserDataFromLocalStorage() {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
      return JSON.parse(userDataString);
  } else {
      return null;
  }
}

function updateRole() {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
      const userData = JSON.parse(userDataString);
      userData.role = 'admin';
      localStorage.setItem('userData', JSON.stringify(userData));
  }
}

export { getUserDataFromLocalStorage, updateRole };
