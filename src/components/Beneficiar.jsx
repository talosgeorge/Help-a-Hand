import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import NavBar from './NavBar';
import CreateRequestContainer from './CreateRequestContainer';
import { doc, getDoc } from "firebase/firestore";

export default function Beneficiar() {
    const [email, setEmail] = useState('');
    const [showCreateRequest, setShowCreateRequest] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("User data:", data);
                        setName(data.name || "Fără nume");
                    } else {
                        console.log("No such document!");
                        setName("Fără document");
                    }
                } catch (err) {
                    console.error("Eroare la citirea numelui:", err);
                    setName("Eroare");
                }
            } else {
                setName("Neautentificat");
            }
        };

        fetchUserName();
    }, []);



    const handleOpenCreateRequest = () => {
        setShowCreateRequest(true);
    };

    const handleCloseCreateRequest = () => {
        setShowCreateRequest(false);
    };

    console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="beneficiar" onOpenCreateRequest={handleOpenCreateRequest} />

            <main className="pt-28 px-6 flex flex-col items-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">Salut, {name}!</h1>
                    <p className="text-gray-600 mb-6">Cu ce te putem ajuta azi?</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={handleOpenCreateRequest}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            🖐 Cere Ajutor
                        </button>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                            📋 Cererile Mele
                        </button>

                        <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                            🧑‍🤝‍🧑 Voluntari Aproape
                        </button>

                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                            📜 Istoric Cereri
                        </button>
                    </div>
                </div>

                {/* GRID de info și idei */}
                <div className="mt-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
                        <p className="text-lg font-medium text-gray-800">📦 Ultima cerere</p>
                        <p className="text-sm text-gray-500 mt-2">„Colet din Poștă”</p>
                        <p className="text-sm text-gray-400">Status: Așteaptă voluntar</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
                        <p className="text-lg font-medium text-gray-800">👥 Voluntari disponibili</p>
                        <p className="text-sm text-gray-500 mt-2">3 voluntari în zona ta</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
                        <p className="text-lg font-medium text-gray-800">❤️ Voluntari preferați</p>
                        <p className="text-sm text-gray-500 mt-2">Niciunul salvat momentan</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
                        <p className="text-lg font-medium text-gray-800">ℹ️ Ai nevoie de ajutor?</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Suntem aici pentru orice întrebare sau nevoie zilnică. Cere ajutor cu încredere!
                        </p>
                    </div>
                </div>
            </main>

            {/* MODAL */}
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
