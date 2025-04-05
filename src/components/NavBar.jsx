import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut as firebaseSignOut } from "firebase/auth";

export default function NavBar({ role, onOpenCreateRequest }) {
    const [userData, setUserData] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [image, setImage] = useState(null);  // State for image
    const navigate = useNavigate();
    const [dropdownTimeout, setDropdownTimeout] = useState(null);  // Timer state for the delay

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

    // Functie pentru a gestiona încărcarea imaginii
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);  // Salvează imaginea încărcată în stat
            };
            reader.readAsDataURL(file);  // Citește fișierul ca URL
        }
    };

    // Functie pentru a șterge imaginea
    const handleImageDelete = () => {
        setImage(null);  // Șterge imaginea și returnează la inițiale
    };

    // Functie pentru a arăta dropdown-ul
    const showDropdown = () => {
        setIsDropdownVisible(true); // Arată dropdown-ul imediat
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout); // Curăță timeout-ul dacă există deja un delay
        }
    };

    // Funcție pentru a ascunde dropdown-ul cu delay
    const hideDropdownWithDelay = () => {
        setDropdownTimeout(
            setTimeout(() => {
                setIsDropdownVisible(false); // Ascunde dropdown-ul după 2 secunde
            }, 300) // Delay de 2 secunde
        );
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
                            onMouseEnter={showDropdown}  // Afișează dropdown-ul imediat
                            onMouseLeave={hideDropdownWithDelay}  // Ascunde dropdown-ul după 2 secunde
                        >
                            {/* Zona mai largă pentru hover */}
                            <div className="flex items-center justify-center hover:cursor-pointer p-3">
                                {/* Button pentru Contul Meu */}
                                <button className="hover:text-green-500">
                                    {/* Cercul cu imagine sau inițiale */}
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="User"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        userData && (
                                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold group-hover:bg-green-600 transition-colors duration-300">
                                                {getInitials(userData.email)}
                                            </div>
                                        )
                                    )}
                                </button>
                            </div>

                            {/* Dropdown-ul */}
                            {userData && isDropdownVisible && (
                                <div className="absolute left-1/2 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 transform -translate-x-1/2">
                                    <div className="flex flex-col space-y-2">
                                        {/* Adaugă imagine */}
                                        <div className="text-center">
                                            <p
                                                className="text-sm cursor-pointer text-blue-500"
                                                onClick={() => {
                                                    if (image) {
                                                        handleImageDelete();  // Șterge imaginea
                                                    } else {
                                                        document.getElementById('file-upload').click();  // Permite încărcarea imaginii
                                                    }
                                                }}
                                            >
                                                {image ? "Șterge imagine" : "Adaugă imagine"}
                                            </p>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </div>

                                        {/* Detalii utilizator */}
                                        <div className="flex justify-between text-sm">
                                            <span><strong>Nume:</strong></span>
                                            <span>{userData.name || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span><strong>Email:</strong></span>
                                            <span className="ml-2">{userData.email || "N/A"}</span>  {/* Adăugat spațiu între Email: și email */}
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span><strong>Rol:</strong></span>
                                            <span>{userData.role}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span><strong>Telefon:</strong></span>
                                            <span>{userData.phone || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span><strong>Oras:</strong></span>
                                            <span>{userData.city || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span><strong>Adresa:</strong></span>
                                            <span>{userData.street || "N/A"}</span>
                                        </div>
                                    </div>

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
