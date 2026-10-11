import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('munim_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: name || (email.split('@')[0] || 'Amit'),
      email,
      role: 'owner',
    };
    setUser(newUser);
    localStorage.setItem('munim_auth_user', JSON.stringify(newUser));
  };

  const demoLogin = () => {
    const demoUser: User = {
      id: 'usr_amit_01',
      name: 'Amit',
      email: 'amit@mymunimjee.com',
      role: 'owner',
    };
    setUser(demoUser);
    localStorage.setItem('munim_auth_user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('munim_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
