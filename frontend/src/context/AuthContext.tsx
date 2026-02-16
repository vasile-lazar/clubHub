import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { User } from '../types';

const AUTH_TOKEN_KEY = 'clubhub_token';
const AUTH_USER_KEY = 'clubhub_user';
const AUTH_STORAGE_KEY = 'clubhub_use_session';

function getStorage(useSession: boolean): Storage {
  return useSession ? sessionStorage : localStorage;
}

function loadStoredAuth(): {
  user: User | null;
  token: string | null;
  useSession: boolean;
} {
  try {
    const useSession = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    const storage = getStorage(useSession);
    const rawUser = storage.getItem(AUTH_USER_KEY);
    const token = storage.getItem(AUTH_TOKEN_KEY);
    const user = rawUser ? (JSON.parse(rawUser) as User) : null;
    return { user, token, useSession };
  } catch {
    return { user: null, token: null, useSession: false };
  }
}

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { user: storedUser, token: storedToken } = loadStoredAuth();
    setUser(storedUser);
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  const handleAuthLogout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [handleAuthLogout]);

  const persistAuth = useCallback(
    (userData: User, tokenValue: string, rememberMe: boolean) => {
      const storage = getStorage(!rememberMe);
      const otherStorage = getStorage(rememberMe);
      otherStorage.removeItem(AUTH_TOKEN_KEY);
      otherStorage.removeItem(AUTH_USER_KEY);
      storage.setItem(AUTH_TOKEN_KEY, tokenValue);
      storage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
      localStorage.setItem(AUTH_STORAGE_KEY, String(!rememberMe));
      setUser(userData);
      setToken(tokenValue);
    },
    []
  );

  const login = useCallback(
    async (username: string, password: string, rememberMe = true) => {
      let role: User['role'] = 'user';
      if (username === 'admin' && password === 'admin') {
        role = 'admin';
      } else if (username === 'user' && password === 'user') {
        role = 'user';
      } else {
        throw new Error('Invalid credentials');
      }
      const mockUser: User = { username, role };
      const mockToken = `mock-jwt-${Date.now()}`;
      persistAuth(mockUser, mockToken, rememberMe);
    },
    [persistAuth]
  );

  const logout = useCallback(() => {
    handleAuthLogout();
  }, [handleAuthLogout]);

  const register = useCallback(
    async (username: string, _password: string, rememberMe = true) => {
      const mockUser: User = { username, role: 'user' };
      const mockToken = `mock-jwt-${Date.now()}`;
      persistAuth(mockUser, mockToken, rememberMe);
    },
    [persistAuth]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      login,
      logout,
      register,
    }),
    [user, token, isLoading, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
