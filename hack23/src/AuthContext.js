import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  const login = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  };

  useEffect(() => {
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}