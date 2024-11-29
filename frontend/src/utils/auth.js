export const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return null;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const isExpired = decodedToken.exp * 1000 < Date.now();
    
    if (isExpired) {
      localStorage.removeItem('authToken');
      return null;
    }

    return token;  // Retorna o token se ele for válido
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
};