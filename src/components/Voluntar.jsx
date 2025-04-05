import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import NavBar from './NavBar';
import { doc, getDoc } from 'firebase/firestore';

export default function Voluntar() {
    const [name, setName] = useState('');
    const [showCreateRequest, setShowCreateRequest] = useState(false);

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setName(data.name || 'Fără nume');
                    } else {
                        setName('Fără document');
                    }
                } catch (err) {
                    console.error('Eroare la citirea numelui:', err);
                    setName('Eroare');
                }
            } else {
                setName('Neautentificat');
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

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="voluntar" />

            <main className="pt-28 px-6 flex flex-col items-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">Salut, {name}!</h1>
                    <p className="text-gray-600 mb-6">Cum te putem ajuta azi?</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button
                            onClick={handleOpenCreateRequest}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto"
                        >
                            🖐 Ajută
                        </button>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto">
                            📋 Cererile disponibile
                        </button>
                    </div>
                </div>

                {/* Secțiune de idei / statusuri */}
                <div className="mt-10 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-gray-700 font-medium">📦 Ultima cerere: „Colet din Poștă”</p>
                        <p className="text-sm text-gray-400 mt-2">Status: Așteaptă voluntar</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-gray-700 font-medium">👥 Cereri disponibile în zonă</p>
                        <p className="text-sm text-gray-400 mt-2">Vezi cine are nevoie de ajutor</p>
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
                        {/* Modal content */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-center">Creează o cerere</h3>
                            <p className="text-center text-gray-500">Completează detaliile cererii tale</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={handleCloseCreateRequest}
                                    className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg transition"
                                >
                                    Anulează
                                </button>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                                >
                                    Crează cerere
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
