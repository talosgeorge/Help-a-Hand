import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("beneficiar");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user profile (email, role) in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                role: role,
                createdAt: new Date()
            });

            alert("Account created successfully!");

        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full"
                onChange={(e) => setPassword(e.target.value)}
            />

            <select
                className="border p-2 w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="beneficiar">Beneficiar</option>
                <option value="voluntar">Voluntar</option>
            </select>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create Account
            </button>
        </form>
    );
}
