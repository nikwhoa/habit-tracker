"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EyeIcon from "@/components/common/EyeIcon";
import { useAuth } from "@/contexts/auth";

export default function Login() {
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // localStorage.setItem("token", data.access_token);
        login(data.access_token);
        const from = searchParams.get("from") || "/";
        router.push(from);
      }

      if (response.status === 401) {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600">
            Login to continue tracking your habits
          </p>
        </div>

        <form
          className="space-y-4 dark:bg-slate-800 bg-white p-8 rounded-lg shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 dark:text-gray-400"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:text-gray-400"
              required
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 dark:text-gray-400"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:text-gray-400"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-0"
            >
              <EyeIcon />
            </button>
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-foreground text-background rounded-lg"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="text-foreground hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
