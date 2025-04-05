import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch the user's role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const role = userDoc.data().role;
                // Show the role in an alert
                alert(`Login successful! Your role is: ${role}`);
            } else {
                alert("User data not found in Firestore.");
            }
        } catch (error) {
            alert("Error: " + error.message);
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
