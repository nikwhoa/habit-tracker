import { useState, useCallback } from "react";
import { useApi } from "@/hooks/useApi";

interface Habit {
  id: number;
  title: string;
  status: string;
  description: string;
}

export function useHabits() {
  const { fetchWithAuth } = useApi();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHabits = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/habits`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch habits");
    } finally {
      setIsLoading(false);
    }
  }, [fetchWithAuth]);

  const createHabit = async (title: string, description: string) => {
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/habits`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );
      if (response.ok) {
        const newHabit = await response.json();
        setHabits((prevHabits) => [...prevHabits, newHabit]);
        return true;
      }
      return false;
    } catch (error) {
      setError("Failed to create habit");
      console.error(error);
      return false;
    }
  };

  const deleteHabit = async (id: number) => {
    try {
      await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/habits/${id}`, {
        method: "DELETE",
      });
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
      return true;
    } catch (error) {
      setError("Failed to delete habit");
      console.error(error);
      return false;
    }
  };

  return {
    habits,
    isLoading,
    error,
    fetchHabits,
    createHabit,
    deleteHabit,
  };
}
