"use client";

import { useState } from "react";
;

interface CreateHabitFormProps {
  onCreateHabit: (title: string) => Promise<boolean>;
}

export default function CreateHabitForm({
  onCreateHabit,
}: CreateHabitFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const success = await onCreateHabit(title);
      if (success) {
        setTitle("");
      }
      if (!success) {
        setError("Failed to create habit");
      }
    }

    // createHabit(title).then((success) => {
    //   if (success) {
    //     setTitle("");
    //   }
    // }).catch((err) => {
    //   setError("Failed to create habit");
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New habit title"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Create Habit</button>
    </form>
  );
}
