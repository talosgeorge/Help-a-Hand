import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md w-full">
        <div className="px-8 py-4 flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold text-blue-600">Help a Hand</h1>
          <nav className="space-x-6">
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Register
            </a>
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
          <a
            href="#"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700"
          >
            Get Started
          </a>
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
