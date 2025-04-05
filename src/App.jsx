import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Beneficiar from './components/Beneficiar';
import Voluntar from './components/Voluntar';
import "./index.css";

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6">
                        <h1 className="text-2xl font-bold">Bine ai venit!</h1>
                        <div className="flex space-x-4">
                            <Link
                                to="/login"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                }
            />
            <Route
                path="/register"
                element={
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-md w-96">
                            <h1 className="text-2xl font-bold mb-4">Înregistrare</h1>
                            <Register />
                        </div>
                    </div>
                }
            />
            <Route
                path="/login"
                element={
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-md w-96">
                            <h1 className="text-2xl font-bold mb-4 mt-6">Login</h1>
                            <Login />
                        </div>
                    </div>
                }
            />
            <Route path="/beneficiar" element={<Beneficiar />} />
            <Route path="/voluntar" element={<Voluntar />} />
        </Routes>
    );
}