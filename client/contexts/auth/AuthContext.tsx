"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token in cookies only
    const cookieToken = Cookies.get("access_token");
    if (cookieToken) {
      setToken(cookieToken);
    }
    setIsLoading(false);
  }, []);


  const login = (newToken: string) => {
    Cookies.set("access_token", newToken, {
      expires: 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    setToken(newToken);
    localStorage.removeItem("access_token");
  };

  const logout = () => {
    Cookies.remove("access_token");
    setToken(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        login,
        logout,
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);