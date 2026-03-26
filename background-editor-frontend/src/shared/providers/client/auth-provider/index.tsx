'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';
import { ECookieValues } from '@shared/utils/enums';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, initialAuthState }: { children: ReactNode; initialAuthState: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);

  const login = (accessToken: string, refreshToken: string) => {
    setCookie(ECookieValues.ACCESS_TOKEN, accessToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    setCookie(ECookieValues.REFRESH_TOKEN, refreshToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    deleteCookie(ECookieValues.ACCESS_TOKEN);
    deleteCookie(ECookieValues.REFRESH_TOKEN);
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
