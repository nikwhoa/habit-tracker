import { useAuth } from "@/contexts/auth";
import { useCallback } from "react";

export function useApi() {
  const { token, logout } = useAuth();
  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}) => {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          logout();
          throw new Error("Unauthorized");
        }

        return response;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    [token, logout]
  );

  return { fetchWithAuth };
}
