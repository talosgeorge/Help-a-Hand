import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Beneficiar from "./components/Beneficiar";
import Voluntar from "./components/Voluntar";
import PrivateRoute from "./components/PrivateRoute"; // Importă componenta PrivateRoute
import "./index.css";

export default function App() {
  return (
    <Routes>
      {/* Ruta publică */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Ruta pentru înregistrare */}
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

      {/* Ruta pentru login */}
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

      {/* Rute protejate cu PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route path="/beneficiar" element={<Beneficiar />} />
        <Route path="/voluntar" element={<Voluntar />} />
      </Route>
    </Routes>
  );
}
