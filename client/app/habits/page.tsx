"use client";

import { useEffect, useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import HabitItem from "@/components/habits/HabitItem";
import CreateHabitForm from "@/components/habits/CreateHabitForm";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAuth } from "@/contexts/auth";

export default function HabitsPage() {
  const { habits, isLoading, error, fetchHabits, createHabit } = useHabits();
  const { isLoading: authIsLoading } = useAuth();
  const [showCreateHabitForm, setShowCreateHabitForm] = useState(false);

  useEffect(() => {
    if (!authIsLoading) {
      fetchHabits();
    }
  }, [authIsLoading, fetchHabits]);

  if (authIsLoading || isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-red-500 font-bold text-center p-4">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Habits
        </h1>

        <div className="mb-8 flex justify-center">
          {showCreateHabitForm ? (
            <CreateHabitForm onCreateHabit={createHabit} />
          ) : (
            <button
              onClick={() => setShowCreateHabitForm(true)}
              className="w-6/12 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Habit
            </button>
          )}
        </div>

        <div className="space-y-4">
          {habits.map((habit) => (
            <HabitItem key={habit.id} {...habit} onUpdate={fetchHabits} />
          ))}
        </div>
      </div>
    </div>
  );
}
