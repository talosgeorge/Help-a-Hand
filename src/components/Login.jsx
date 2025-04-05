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
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch the user's role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const role = userDoc.data().role;

                if (role === "beneficiar") {
                    alert("Redirecting to Beneficiary page...");
                    navigate("/beneficiar");
                }
                else if (role === "voluntar") {
                    alert("Redirecting to Volunteer page...");
                    navigate("/voluntar");
                } else {
                    alert("Unknown role.");
                }
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
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Login
            </button>

            <button
                onClick={handleGoBack}
                className="mt-4 text-red-500 hover:text-red-700 float-right px-4 py-2 rounded"
            >
                Go Back
            </button>

        </form>
    );
}
