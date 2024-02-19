import { createContext, useState, useContext, PropsWithChildren, useCallback, useEffect } from 'react';
import { useGoTo } from '../hooks/useGoTo';

type AuthContextValue = {
  isAuthenticated: boolean;
  token: string | undefined;
  isLoaded: boolean;
  login: (value: string) => void;
  logout: () => void;
}

const userTokenKey = 'user-token';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>();
  const isAuthenticated = !!token;
  const [isLoaded, setIsLoaded] = useState(false);
  const goTo = useGoTo();

  const login = useCallback((value: string) => {
    setToken(value);
    localStorage.setItem(userTokenKey, value);
    goTo('task');
  }, [goTo]);

  const logout = useCallback(() => {
    setToken(undefined);
    localStorage.removeItem(userTokenKey);
    goTo('login')
  }, [goTo]);

  useEffect(() => {
    const existingToken = localStorage.getItem(userTokenKey);
    setToken(existingToken || undefined);
    console.log(existingToken);
    setIsLoaded(true);
  }, [])

  return (
    <AuthContext.Provider value={{ isLoaded, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
