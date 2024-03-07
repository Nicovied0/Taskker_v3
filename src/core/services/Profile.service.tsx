class ProfileService {
    getUserDataFromLocalStorage(): any {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        return userData;
      } else {
        return null;
      }
    }
  
    updateRol() {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.role = 'admin';
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    }
  }
  
  export default new ProfileService();
  