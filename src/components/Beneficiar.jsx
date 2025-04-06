import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import NavBar from "./NavBar";
import CreateRequestContainer from "./CreateRequestContainer";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Beneficiar() {
    const [showCreateRequest, setShowCreateRequest] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setIsAuthenticated(true);
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData({
                            ...data,
                            email: user.email,
                            role: "beneficiar"
                        });
                    }
                } catch (err) {
                    console.error("Eroare la citirea datelor:", err);
                }
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/");
        }
    }, [loading, isAuthenticated, navigate]);

    const handleOpenCreateRequest = () => setShowCreateRequest(true);
    const handleCloseCreateRequest = () => setShowCreateRequest(false);

    const updateUserPackage = async (pkg) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            try {
                await updateDoc(userRef, { package: pkg });
                setUserData((prev) => ({ ...prev, package: pkg }));
            } catch (error) {
                console.error("Eroare la salvare pachet:", error);
            }
        }
    };

    const handlePackageSelect = (pkg) => {
        updateUserPackage(pkg);
    };

    if (loading || !userData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">Se încarcă...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar
                role="beneficiar"
                onOpenCreateRequest={handleOpenCreateRequest}
                userData={userData}
                setUserData={setUserData}
            />

            <main className="pt-20 px-6 flex flex-col items-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">
                        Salut, {userData.name?.charAt(0).toUpperCase() + userData.name?.slice(1) || "utilizator"}! <span className="animate-bounce inline-block">👋</span>
                    </h1>
                    <p className="text-gray-600 mb-6">Cu ce te putem ajuta azi?</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={handleOpenCreateRequest}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md shadow-green-300"
                        >
                            🖐 Cere Ajutor
                        </button>
                        <Link
                            to="/beneficiar/requests"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition text-center"
                        >
                            📋 Cererile Mele
                        </Link>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                            🧑‍🤝‍🧑 Voluntari Aproape
                        </button>
                        <Link
                            to="/beneficiar/istoric"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition text-center"
                        >
                            📜 Istoric Cereri
                        </Link>
                    </div>
                </div>

                <div className="mt-8 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-lg font-medium text-gray-800">📦 Ultima cerere</p>
                        <p className="text-sm text-gray-500 mt-2">„Colet din Poștă”</p>
                        <p className="text-sm text-gray-400">Status: Așteaptă voluntar</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-lg font-medium text-gray-800">👥 Voluntari disponibili</p>
                        <p className="text-sm text-gray-500 mt-2">3 voluntari în zona ta</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-lg font-medium text-gray-800">❤️ Voluntari preferați</p>
                        <p className="text-sm text-gray-500 mt-2">Niciunul salvat momentan</p>
                    </div>
                    <div className="bg-[#f0fdf4] p-6 rounded-xl shadow text-center">
                        <p className="text-lg font-medium text-gray-800">ℹ️ Ai nevoie de ajutor?</p>
                        <p className="text-sm text-gray-600 mt-2">Cere ajutor cu încredere, suntem aici zilnic pentru tine.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-lg font-medium text-gray-800">📞 Contact suport</p>
                        <p className="text-sm text-gray-600 mt-2">0720 123 456 (L-V 9:00–17:00)</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-lg font-medium text-gray-800">📘 Ghid de utilizare</p>
                        <p className="text-sm text-gray-600 mt-2">Află cum funcționează aplicația și ce poți cere</p>
                    </div>
                </div>

                <p className="text-xs text-gray-400 text-center mt-10">
                    Ai sugestii? Spune-ne ce ai vrea să adăugăm 💡
                </p>
            </main>

            {showCreateRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={handleCloseCreateRequest}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                        <CreateRequestContainer onClose={handleCloseCreateRequest} />
                    </div>
                </div>
            )}
        </div>
    );
}