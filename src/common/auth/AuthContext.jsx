// authContext.js
import React, { createContext, useState, useContext } from 'react';
import { IdleTimerProvider } from 'react-idle-timer';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const IDLE_TIME = 1000 * 60 * 60; //Idle time is 60 minutes

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
  }

  const handleOnIdle = () => {
    logout()
    window.location = "/login?session_expired=1";
  }


  return (
    <IdleTimerProvider
      timeout={IDLE_TIME} 
      onIdle={handleOnIdle}
      onActive={() => { }}
      debounce={500}
    >
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    </IdleTimerProvider>
  );
};
