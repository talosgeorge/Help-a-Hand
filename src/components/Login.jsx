import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    console.log("Username: ", email);
    c;
    e.preventDefault();
    try {
      // Sign in the user with Firebase Authentication
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
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="username"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your Username"
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
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </form>
  );
}
