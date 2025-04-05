import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md w-full">
        <div className="px-8 py-4 flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold text-green-500">Help a Hand</h1>
          <nav className="space-x-6">
            <Link
              to="/login"
              className="text-green-500 font-semibold hover:text-white hover:bg-green-500 px-4 py-2 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-green-500 font-semibold hover:text-white hover:bg-green-500 px-4 py-2 rounded transition"
            >
              Înregistrare
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center px-8">
        <div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Help a Hand
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Fiecare mână întinsă contează.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 rounded transition"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 shadow-inner w-full">
        <p className="text-sm text-gray-500">
          &copy; 2025 MySite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
