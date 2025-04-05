import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import NavBar from './NavBar';
import { doc, getDoc } from 'firebase/firestore';
import {Link} from "react-router-dom";

export default function Voluntar() {
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setName(data.name.charAt(0).toUpperCase() + data.name.slice(1) || 'Fără nume');
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

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="voluntar" />

            <main className="pt-20 px-6 flex flex-col items-center">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">
                        Salut, {name}! <span className="animate-bounce inline-block">🤝</span>
                    </h1>
                    <p className="text-gray-600 mb-6">Gata să faci o diferență azi?</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/voluntar/requests" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto min-w-[150px]">
                            📋 Cereri disponibile
                        </Link>

                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto min-w-[150px]">
                            ✅ Cererile mele acceptate
                        </button>

                        <button
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto min-w-[150px]">
                            📍 Voluntariat în zona ta
                        </button>

                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto min-w-[150px]">
                            🕓 Istoric ajutor
                        </button>
                    </div>
                </div>

                {/* Grid info */}
                <div className="mt-8 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                        <p className="text-lg font-medium text-gray-800">🧾 Ultima cerere acceptată</p>
                        <p className="text-sm text-gray-500 mt-2">„Farmacie pentru vecina Maria”</p>
                        <p className="text-sm text-gray-400">Status: În curs de finalizare</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                        <p className="text-lg font-medium text-gray-800">📍 Cereri apropiate</p>
                        <p className="text-sm text-gray-500 mt-2">5 cereri la <strong>sub 1 km</strong> de tine</p>
                    </div>

                    <div
                        className="bg-[#f0fdf4] p-6 rounded-xl shadow text-center hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                        <p className="text-lg font-medium text-gray-800">🎉 Ai ajutat 3 persoane!</p>
                        <p className="text-sm text-gray-600 mt-2">Felicitări, contribuția ta contează!</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                        <p className="text-lg font-medium text-gray-800">ℹ️ Ai nevoie de ajutor?</p>
                        <p className="text-sm text-gray-600 mt-2">
                            Dacă ai întrebări despre cereri sau voluntariat, suntem aici pentru tine.
                        </p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                        <p className="text-lg font-medium text-gray-800">📞 Contact suport</p>
                        <p className="text-sm text-gray-600 mt-2">0720 123 456 <br/>support@helpa.ro</p>
                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                        <p className="text-lg font-medium text-gray-800">🧠 Sfaturi utile</p>
                        <p className="text-sm text-gray-600 mt-2">
                            Zâmbește, ascultă și oferă ajutorul cu empatie. Uneori, o vorbă bună contează enorm.
                        </p>
                    </div>
                </div>


                {/* Feedback footer */}
                <p className="text-xs text-gray-400 text-center mt-5">
                    Vrei să vezi un istoric complet al ajutoarelor? Funcționalitate în curând 🔧
                </p>
            </main>
        </div>
    );
}
