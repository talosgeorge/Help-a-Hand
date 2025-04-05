import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Beneficiar from "./components/Beneficiar";
import Voluntar from "./components/Voluntar";
import RequestView from "./components/RequestView";
import "./index.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
                path="/register"
                element={
                    <div className="relative min-h-screen flex items-center justify-center">
                        {/* Layer cu imagine de fundal opacă */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                            style={{
                                backgroundImage: "url('/images/background_logo_register.png')",
                                backgroundAttachment: "fixed"
                            }}
                        />

                        {/* Formular de înregistrare */}
                        <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-90 p-10 rounded-xl shadow-lg">
                            <h1 className="text-2xl font-bold mb-4 text-center">Înregistrare</h1>
                            <Register />
                        </div>
                    </div>
                }
            />

            <Route
                path="/login"
                element={
                    <div className="relative min-h-screen flex items-center justify-center">
                        {/* Layer cu imagine de fundal opacă */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                            style={{
                                backgroundImage: "url('/images/background_logo_register.png')",
                                backgroundAttachment: "fixed"
                            }}
                        />

                        {/* Formular de login */}
                        <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 p-10 rounded-xl shadow-lg">
                            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
