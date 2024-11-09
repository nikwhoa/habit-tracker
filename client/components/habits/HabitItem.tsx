"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useHabits } from "@/hooks/useHabits";
import DeleteButtonIcon from "../common/DeleteButtonIcon";

interface HabitItemProps {
  id: number;
  title: string;
  description: string;  // Added description prop
  status: string;
  onUpdate: () => void;
}

export default function HabitItem({
  id,
  title,
  description,
  status,
  onUpdate,
}: HabitItemProps) {
  const { fetchWithAuth } = useApi();
  const { deleteHabit } = useHabits();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);  // State for editing description

  const toggleComplete = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/habits/${id}`, {
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

  const handleDelete = async () => {
    await deleteHabit(id);
    onUpdate();
  };

  const handleEdit = async () => {
    setIsEditing(false); // Exit editing mode
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/habits/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (response.ok) {
        onUpdate(); // Refresh the parent component with new data
      }
    } catch (error) {
      console.error("Failed to edit habit:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-200 rounded-lg shadow-sm space-y-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className="p-2 border rounded mb-2"
            placeholder="Edit title"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className="p-2 border rounded"
            placeholder="Edit description"
          />
        </>
      ) : (
        <>
          <span className={`text-lg ${status === "completed" ? "line-through text-gray-500" : ""}`}>
            {title}
          </span>
          <p className="text-gray-700">{description}</p>
        </>
      )}
      <div className="flex items-center space-x-2 mt-2">
        <button onClick={toggleComplete} className="text-green-500">✓</button>
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500">
          ✎
        </button>
        <button onClick={handleDelete} className="text-red-500">
          <DeleteButtonIcon />
        </button>
      </div>
    </div>
  );
}
