import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function NavBar({ role , onOpenCreateRequest }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    setUserData({
                        email: user.email,
                        ...userDoc.data(),
                    });
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <header className="w-full fixed top-0 left-0 z-10 bg-white shadow-md">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <div className="flex float-left">
                    <Link to="/" className="text-green-500 text-xl font-semibold float-left">
                        Help-a-Hand
                    </Link>
                </div>
                <div className="flex items-center space-x-8 text-lg text-gray-700">
                    <ul className="flex space-x-8">
                        {role === "beneficiar" && (
                            <li>
                                <Link to="/beneficiar/requests" className="hover:text-green-500">
                                    Requests
                                </Link>
                                <button onClick={onOpenCreateRequest} className="hover:text-green-500">
                                CreateRequest
                                </button>
                            </li>
                        )}
                        {role === "voluntar" && (
                            <li>
                                <Link to="/voluntar/requests" className="hover:text-green-500">
                                    Requests
                                </Link>
                            </li>
                        )}
                        <li className="relative group">
                            <button className="hover:text-green-500">
                                Contul Meu
                            </button>
                            {userData && (
                                <div className="absolute right-0 w-60 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 hidden group-hover:block">
                                    <p className="text-sm"><strong>Nume:</strong> {userData.nume || "N/A"}</p>
                                    <p className="text-sm"><strong>Email:</strong> {userData.email}</p>
                                    <p className="text-sm"><strong>Rol:</strong> {userData.role}</p>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
