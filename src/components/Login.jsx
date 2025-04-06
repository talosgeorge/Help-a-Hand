import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Fetch the user's role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const role = userDoc.data().role;

                if (role === "beneficiar") {
                    navigate("/beneficiar");
                } else if (role === "voluntar") {
                    navigate("/voluntar");
                } else {
                    alert("Unknown role.");
                }
            } else {
                alert("User data not found.");
            }
        } catch (error) {
            alert("Eroare la autentificare: " + error.message);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="username"
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
                    Parola
                </label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Parola"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-[#70d299] text-white font-semibold rounded-lg hover:bg-[#429b7f] transition"
            >
                Sign In
            </button>
        </form>
    );
}
