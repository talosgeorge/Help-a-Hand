import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import NavBar from './NavBar';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";

export default function Voluntar() {
    const [name, setName] = useState('');
    const [completedRequests, setCompletedRequests] = useState(0);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setName(data.name.charAt(0).toUpperCase() + data.name.slice(1) || 'Fără nume');
                        setCompletedRequests(data.completedRequests || 0);
                    } else {
                        setName('Fără document');
                    }
                } catch (err) {
                    console.error('Eroare la citirea datelor:', err);
                    setName('Eroare');
                }
            } else {
                setName('Neautentificat');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="voluntar" />

            <main className="pt-24 pb-16 px-6 flex flex-col items-center">
                {/* Greeting Section */}
                <section className="bg-white p-10 rounded-xl shadow-md w-full max-w-4xl text-center mb-12">
                    <h1 className="text-4xl font-bold text-green-700 mb-3">
                        Salut, {name}! <span className="animate-bounce inline-block">🤝</span>
                    </h1>
                    <p className="text-gray-600 text-lg">Gata să faci o diferență azi?</p>
                </section>

                {/* Action Buttons */}
                <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    <Link to="/voluntar/requests" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg transition text-center">
                        📋 Cereri disponibile
                    </Link>
                    <Link to="/voluntar/cereriacceptate" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-lg transition text-center">
                        ✅ Cererile mele acceptate
                    </Link>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-4 rounded-lg transition">
                        📍 Voluntariat în zona ta
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-lg transition">
                        🕓 Istoric ajutor
                    </button>
                </section>

                {/* Statistici & Info */}
                <section className="w-full max-w-6xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Activitate & Informații</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition h-full">
                            <p className="text-lg font-medium text-gray-800">🧾 Ultima cerere acceptată</p>
                            <p className="text-sm text-gray-500 mt-2">„Farmacie pentru vecina Maria”</p>
                            <p className="text-sm text-gray-400">Status: În curs de finalizare</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition h-full">
                            <p className="text-lg font-medium text-gray-800">📍 Cereri apropiate</p>
                            <p className="text-sm text-gray-500 mt-2">5 cereri la <strong>sub 1 km</strong> de tine</p>
                        </div>

                        <div className="bg-[#f0fdf4] p-6 rounded-xl shadow text-center hover:shadow-lg transition h-full">
                            <p className="text-lg font-medium text-gray-800">
                                🎉 Ai ajutat {completedRequests} persoan{completedRequests === 1 ? 'ă' : 'e'}!
                            </p>
                            <p className="text-sm text-gray-600 mt-2">Felicitări, contribuția ta contează!</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition h-full">
                            <p className="text-lg font-medium text-gray-800">ℹ️ Ai nevoie de ajutor?</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Dacă ai întrebări despre cereri sau voluntariat, suntem aici pentru tine.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition h-full">
                            <p className="text-lg font-medium text-gray-800">📞 Contact suport</p>
                            <p className="text-sm text-gray-600 mt-2">0720 123 456<br />support@helpa.ro</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition h-full">
                            <p className="text-lg font-medium text-gray-800">🧠 Sfaturi utile</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Zâmbește, ascultă și oferă ajutorul cu empatie. Uneori, o vorbă bună contează enorm.
                            </p>
                        </div>
                    </div>
                </section>

                <p className="text-xs text-gray-400 text-center mt-12">
                    Vrei să vezi un istoric complet al ajutoarelor? Funcționalitate în curând 🔧
                </p>
            </main>
        </div>
    );
}
