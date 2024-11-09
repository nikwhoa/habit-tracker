export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-600">Start your habit tracking journey</p>
        </div>

        <form className="space-y-4 dark:bg-slate-800 bg-white p-8 rounded-lg shadow-sm">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 dark:text-gray-400"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:text-gray-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 dark:text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:text-gray-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 dark:text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:text-gray-400"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 6 characters
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1 dark:text-gray-400"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-foreground hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
