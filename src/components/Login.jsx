// src/components/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Autentificat cu succes!");
        } catch (error) {
            alert("Eroare: " + error.message);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Parolă"
                className="border p-2 w-full"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Login
            </button>
        </form>
    );
}
