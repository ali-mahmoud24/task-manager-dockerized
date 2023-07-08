import React, { createContext, useState, useCallback, useEffect } from 'react';

import AuthContextType from '../models/authContext';

interface User {
  token: string | null;
  userId: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userSession, setUserSession] = useState<User>();

  const login = useCallback((token: string, userId: string) => {
    setUserSession({
      token,
      userId,
    });
    localStorage.setItem(
      'userData',
      JSON.stringify({
        token,
        userId,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserSession({
      token: null,
      userId: null,
    });
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const getUserData = () => {
      let userData: User = {
        token: null,
        userId: null,
      };

      try {
        if (typeof window !== 'undefined') {
          const jsonStoredData = localStorage.getItem('userData');
          if (typeof jsonStoredData === 'string') {
            const storedData = JSON.parse(jsonStoredData);
            if (storedData) {
              userData = storedData;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      return userData;
    };

    setUserSession(getUserData());
  }, []);

  useEffect(() => {
    const jsonStoredData = localStorage.getItem('userData');
    if (typeof jsonStoredData === 'string') {
      const storedData = JSON.parse(jsonStoredData);
      if (storedData && storedData.token) {
        login(storedData.token, storedData.userId);
      }
    }
  }, [login]);

  const value = {
    token: userSession?.token,
    userId: userSession?.userId,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
