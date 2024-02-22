import { createContext, useState, useContext, PropsWithChildren, useCallback, useEffect } from 'react';
import { useGoTo } from '../hooks/useGoTo';
import { useRequest } from '../hooks/useRequest';
import axios from 'axios';
import { appConfig } from '../config/app';

type AuthContextValue = {
  isAuthenticated: boolean;
  token: string | undefined;
  isLoaded: boolean;
  userInfo: UserInfo | undefined;
  login: (value: string) => void;
  logout: () => void;
}

const userTokenKey = 'user-token';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>();
  const isAuthenticated = !!token;
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
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

  const reloadUserInfo = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoaded(true);
      setUserInfo(undefined);
      return;
    }
    try {
      const response = await axios<UserInfo>({
        url: `${appConfig.baseApiPath}/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUserInfo(response.data);
    } catch (err) {
      setToken(undefined);
      setUserInfo(undefined);
      localStorage.removeItem(userTokenKey);
    }
    setIsLoaded(true);
  }, [isAuthenticated, token])

  useEffect(() => {
    const existingToken = localStorage.getItem(userTokenKey);
    setToken(existingToken || undefined);
    setIsLoaded(true);
  }, [reloadUserInfo])

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    reloadUserInfo();
  }, [isLoaded, reloadUserInfo])


  return (
    <AuthContext.Provider value={{ userInfo, isLoaded, token, login, logout, isAuthenticated }}>
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
