import Login from "./Login";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-10 flex justify-between items-center shadow-md bg-white">
        <h1 className="text-2xl font-bold text-blue-600">Help a Hand</h1>
      </header>

      {/* Main Login Section */}
      <main className="flex-1 flex items-center justify-center bg-opacity-80 bg-gray-100 px-6">
        <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {/* Your Existing Form Component Here */}
          <Login />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-white text-center text-sm text-gray-500 shadow-inner">
        © 2025 MySite. All rights reserved.
      </footer>
    </div>
  );
}
