import { createContext, useState, useContext, PropsWithChildren } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  token: string | undefined;
  setToken: (value: string | undefined) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
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
