"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAuth } from "@/contexts/auth";

export default function Home() {
  const { token, logout, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex justify-end gap-4">
        {token ? (
          <>
            <a href="/habits" className="text-foreground hover:underline">
              Habits
            </a>
            <button
              onClick={logout}
              className="text-foreground hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/auth/login" className="text-foreground hover:underline">
              Login
            </a>
            <a
              href="/auth/register"
              className="text-foreground hover:underline"
            >
              Register
            </a>
          </>
        )}
      </header>

      <main className="flex flex-col gap-8 items-center text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Habit Tracker</h1>

        <p className="text-xl">
          A simple, free habit tracking app that helps you build better habits.
          This is just for my personal usage, so it&apos;s not following any
          specific design principles, but I&apos;m open to suggestions.
        </p>

        <div className="space-y-6 text-left">
          <h2 className="text-2xl font-bold dark:text-green-400">
            Why to use this app?
          </h2>
          <ul className="space-y-4">
            <li>✨ Simple and straightforward</li>
            <li>🎯 Focus on what matters</li>
            <li>📱 Track your daily progress</li>
            <li>💯 Completely free to use</li>
          </ul>
        </div>

        {token ? (
          <a
            href="/habits"
            className="mt-8 px-8 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Tracking
          </a>
        ) : null}
      </main>

      <footer className="text-center text-sm text-gray-500">
        Built with simplicity in mind
      </footer>
    </div>
  );
}
