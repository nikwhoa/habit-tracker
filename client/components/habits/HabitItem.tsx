"use client";

import { useApi } from "@/hooks/useApi";

interface HabitItemProps {
  id: number;
  title: string;
  status: string;
  onUpdate: () => void;
}

export default function HabitItem({ id, title, status, onUpdate }: HabitItemProps) {
  const { fetchWithAuth } = useApi();

  const toggleComplete = async () => {
    try {
      const response = await fetchWithAuth(`/habits/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: status === "completed" ? "active" : "completed",
        }),
      });

      if (response.ok) {
        onUpdate(); // Refresh the parent component
      }
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={status === "completed"}
        onChange={toggleComplete}
      />
      <span>{title}</span>
    </div>
  );
} 