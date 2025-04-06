import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut as firebaseSignOut } from "firebase/auth";

export default function NavBar({ role, onOpenCreateRequest }) {
    const [userData, setUserData] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [showPackageDropdown, setShowPackageDropdown] = useState(false);
    const [packageDropdownTimeout, setPackageDropdownTimeout] = useState(null);
    const [dropdownTimeout, setDropdownTimeout] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const packageImageMap = {
        Silver: "/images/silver.jpg",
        Gold: "/images/gold.jpg",
        Diamond: "/images/diamond.jpg"
    };

    // Calculul nivelului pe baza XP-ului
    const calculateLevel = (xp) => {
        if (xp >= 300) return 3; // Nivel 3 pentru XP >= 300
        if (xp >= 200) return 2; // Nivel 2 pentru XP >= 200
        if (xp >= 100) return 1; // Nivel 1 pentru XP >= 100
        return 0; // Nivel 0 pentru XP < 100
    };

    // Actualizează nivelul în Firestore
    const updateLevelInDatabase = async (xp) => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const newLevel = calculateLevel(xp); // Calculează nivelul în funcție de XP

        // Actualizează doar dacă nivelul s-a schimbat
        if (userData?.level !== newLevel) {
            try {
                await updateDoc(userRef, { level: newLevel });
                setUserData((prev) => ({ ...prev, level: newLevel }));
            } catch (error) {
                console.error("Eroare la actualizarea nivelului:", error);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    setUserData({
                        email: user.email,
                        ...userDoc.data(),
                    });
                }
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Actualizează nivelul la fiecare schimbare de XP
    useEffect(() => {
        if (userData?.xp || userData?.xp === 0) {
            // Verifică dacă XP-ul a ajuns la 100 și resetează-l, crește nivelul
            const xpAfterReset = userData.xp >= 100 ? 0 : userData.xp;
            updateLevelInDatabase(xpAfterReset); // Actualizează nivelul
        }
    }, [userData?.xp]); // Această logică se va declanșa atunci când XP-ul se schimbă

    const getInitials = (email) => {
        return email.split("@")[0].slice(0, 2).toUpperCase();
    };

    const handleLogout = async () => {
        try {
            await firebaseSignOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Eroare la deconectare: ", error);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        setImage(null);
    };

    const showDropdown = () => {
        setIsDropdownVisible(true);
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout);
        }
    };

    const hideDropdownWithDelay = () => {
        setDropdownTimeout(
            setTimeout(() => {
                setIsDropdownVisible(false);
            }, 300)
        );
    };

    const handlePackageSelect = async (pkg) => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        try {
            await updateDoc(userRef, { package: pkg });
            setUserData((prev) => ({ ...prev, package: pkg }));
            setShowPackageDropdown(false);
        } catch (error) {
            console.error("Eroare la actualizarea pachetului:", error);
        }
    };

    const shouldShowBackButton = location.pathname === "/voluntar/request" || location.pathname === "/beneficiar/request";

    // Adăugăm calculul progresului XP
    const xp = userData?.xp || 0; // Valoare default XP
    const xpPercentage = (xp / 100) * 100;

    const getProgressBarColor = () => {
        if (xpPercentage <= 20) return "bg-red-600";
        if (xpPercentage <= 60) return "bg-yellow-500";
        return "bg-green-600";
    };

    return (
        <header className="w-full fixed top-0 left-0 z-20 bg-white shadow-sm">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2 h-16">
                <div className="flex float-left">
                    <Link to="/" className="text-green-500 text-3xl font-semibold float-left">
                        Help-a-Hand
                    </Link>
                </div>

                <div className="flex items-center space-x-6 text-lg text-gray-700">
                    {shouldShowBackButton && (
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg ml-4 transition duration-200"
                        >
                            ← Înapoi
                        </button>
                    )}

                    {/* Buton alegere pachet doar pentru beneficiar */}
                    {userData?.role === "beneficiar" && (
                        <div
                            className="relative"
                            onMouseEnter={() => {
                                if (packageDropdownTimeout) clearTimeout(packageDropdownTimeout);
                                setShowPackageDropdown(true);
                            }}
                            onMouseLeave={() => {
                                const timeout = setTimeout(() => setShowPackageDropdown(false), 300);
                                setPackageDropdownTimeout(timeout);
                            }}
                        >
                            <button className="flex items-center gap-2 border rounded-full px-3 py-1 hover:border-green-400 transition">
                                {userData.package ? (
                                    <img
                                        src={packageImageMap[userData.package]}
                                        alt="Pachet"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-300"></div>
                                )}
                                <span className="text-sm text-gray-700">
                                    {userData.package || "Alege pachet"}
                                </span>
                            </button>

                            {showPackageDropdown && (
                                <div className="absolute top-12 left-0 bg-white border rounded-xl shadow-lg p-3 grid grid-cols-3 gap-2 z-50 w-72">
                                    {["Silver", "Gold", "Diamond"].map((pkg) => (
                                        <div
                                            key={pkg}
                                            onClick={() => handlePackageSelect(pkg)}
                                            className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 border-2 ${userData.package === pkg
                                                ? "border-green-500 scale-105"
                                                : "border-transparent hover:border-green-300"
                                                }`}
                                        >
                                            <img
                                                src={packageImageMap[pkg]}
                                                alt={pkg}
                                                className="w-full h-20 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 text-white flex items-center justify-center text-sm font-semibold">
                                                {pkg}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bara de XP */}
                    {userData?.role === "voluntar" && (
                        <div className="flex items-center gap-2">
                            <p className="text-gray-700">Nivel: {userData?.level || 0}</p>
                            <div className="relative w-32 h-4 bg-gray-300 rounded-full">
                                <div
                                    className={`absolute top-0 left-0 h-full ${getProgressBarColor()} rounded-full`}
                                    style={{ width: `${xpPercentage}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Dropdown cont utilizator */}
                    <li
                        className="relative flex items-center space-x-2"
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdownWithDelay}
                    >
                        <div className="flex items-center justify-center hover:cursor-pointer p-3">
                            <button className="hover:text-green-500">
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

                        {userData && isDropdownVisible && (
                            <div className="absolute left-1/2 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 transform -translate-x-1/2">
                                <div className="flex flex-col space-y-2">
                                    <div className="text-center">
                                        <p
                                            className="text-sm cursor-pointer text-blue-500"
                                            onClick={() => {
                                                if (image) {
                                                    handleImageDelete();
                                                } else {
                                                    document.getElementById("file-upload").click();
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

                                    <div className="flex justify-between text-sm">
                                        <span><strong>Nume:</strong></span>
                                        <span>{userData.name || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span><strong>Email:</strong></span>
                                        <span>{userData.email || "N/A"}</span>
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
                                        <span className="font-semibold">Oras:</span>
                                        <span className="ml-2 whitespace-nowrap">{userData.city || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span><strong>Adresa:</strong></span>
                                        <span>{userData.street || "N/A"}</span>
                                    </div>
                                </div>

                                <p
                                    onClick={handleLogout}
                                    className="w-full text-white bg-red-500 hover:bg-red-600 mt-2 py-1 rounded-lg text-center cursor-pointer transition-colors duration-300 text-sm"
                                >
                                    Disconnect
                                </p>
                            </div>
                        )}
                    </li>
                </div>
            </nav>
        </header>
    );
}
