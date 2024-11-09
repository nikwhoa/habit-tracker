"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";

interface Habit {
  id: number;
  title: string;
  status: string;
}

export default function Dashboard() {
  const { fetchWithAuth } = useApi();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetchWithAuth("/habits");
        if (response.ok) {
          const data = await response.json();
          setHabits(data);
        }
      } catch (err) {
        setError("Failed to fetch habits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Habits</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>{habit.title}</li>
        ))}
      </ul>
    </div>
  );
} 