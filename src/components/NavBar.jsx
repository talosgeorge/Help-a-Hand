import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut as firebaseSignOut } from "firebase/auth";

export default function NavBar({ role , onOpenCreateRequest }) {
    const [userData, setUserData] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

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

    // Functie pentru a extrage primele 2 initiale din email
    const getInitials = (email) => {
        const initials = email.split('@')[0].slice(0, 2).toUpperCase(); // Extrage primele doua litere din partea de dinaintea "@"
        return initials;
    };

    // Functie pentru a deconecta utilizatorul
    const handleLogout = async () => {
        try {
            await firebaseSignOut(auth); // Deconectează utilizatorul
            navigate("/"); // Redirecționează utilizatorul pe pagina principală
        } catch (error) {
            console.error("Eroare la deconectare: ", error);
        }
    };

    return (
        <header className="w-full fixed top-0 left-0 z-10 bg-white shadow-md">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <div className="flex float-left">
                    <Link to="/" className="text-green-500 text-3xl font-semibold float-left">
                        Help-a-Hand
                    </Link>
                </div>
                <div className="flex items-center space-x-8 text-lg text-gray-700">
                    <ul className="flex space-x-8">
                        {role === "beneficiar" && (
                            <li className="flex items-center">
                                <Link to="/beneficiar/requests" className="hover:text-green-500 text-lg">
                                    Requests
                                </Link>
                                <button onClick={onOpenCreateRequest} className="hover:text-green-500">
                                CreateRequest
                                </button>
                            </li>
                        )}
                        {role === "voluntar" && (
                            <li className="flex items-center">
                                <Link to="/voluntar/requests" className="hover:text-green-500 text-lg">
                                    Requests
                                </Link>
                            </li>
                        )}
                        <li
                            className="relative flex items-center space-x-2"
                            onMouseEnter={() => setIsDropdownVisible(true)}
                            onMouseLeave={() => setIsDropdownVisible(false)}
                        >
                            {/* Zona mai largă pentru hover */}
                            <div className="flex items-center justify-center hover:cursor-pointer p-3">
                                {/* Button pentru Contul Meu */}
                                <button className="hover:text-green-500">
                                    {/* Cercul cu initialele */}
                                    {userData && (
                                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold group-hover:bg-green-600 transition-colors duration-300">
                                            {getInitials(userData.email)}
                                        </div>
                                    )}
                                </button>
                            </div>

                            {/* Dropdown-ul */}
                            {userData && isDropdownVisible && (
                                <div className="absolute left-1/2 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 transform -translate-x-1/2">
                                    <p className="text-sm"><strong>Nume:</strong> {userData.name || "N/A"}</p>
                                    <p className="text-sm"><strong>Email:</strong> {userData.email}</p>
                                    <p className="text-sm"><strong>Rol:</strong> {userData.role}</p>
                                    <p className="text-sm"><strong>Telefon:</strong> {userData.phone || "N/A"}</p>
                                    <p className="text-sm"><strong>Adresa:</strong> {userData.street || "N/A"}</p>
                                    {/* P tag pentru deconectare */}
                                    <p
                                        onClick={handleLogout}
                                        className="w-full text-white bg-red-500 hover:bg-red-600 mt-2 py-1 rounded-lg text-center cursor-pointer transition-colors duration-300 text-sm"
                                    >
                                        Disconnect
                                    </p>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
