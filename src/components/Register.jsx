import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("beneficiar");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Salvăm și în Firestore profilul complet
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role,
        createdAt: new Date(),
      });

      alert("Cont creat cu succes!");
    } catch (error) {
      alert("Eroare: " + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nume Utilizator
          </label>
          <input
            //onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nume Utilizator"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
            required
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Oras
          </label>
          <input
            //onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Orasul d-voastra"
            required
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Adresa
          </label>
          <input
            //onChange={(e) => setConfirmPassword(e.target.value)}
            type="text"
            id="address"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Adresa d-voastra"
            required
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            id="role"
            value={role}
            //onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="beneficiar">Beneficiar</option>
            <option value="voluntar">Voluntar</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
      >
        Register
      </button>
    </form>
  );
}
