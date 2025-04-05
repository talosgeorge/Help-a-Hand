import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function VoluntarAccepted() {
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const q = query(
                collection(db, "requests"),
                where("status", "==", "accepted"),
                where("volunteerId", "==", user.uid)
            );

            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAcceptedRequests(data);
        };

        fetchAcceptedRequests();
    }, []);

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="voluntar" />

            <main className="pt-28 px-6 flex flex-col items-center">
                <div className="w-full max-w-4xl text-center mb-6">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">Cererile Mele Acceptate</h1>
                    <p className="text-gray-600">Aici vezi cererile pe care le-ai acceptat</p>
                </div>

                {/* Buton de întoarcere */}
                <button
                    onClick={() => navigate("/voluntar")}
                    className="mb-8 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                >
                    ← Înapoi la Home
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {acceptedRequests.length === 0 ? (
                        <p className="text-gray-600 col-span-full">Nicio cerere acceptată momentan.</p>
                    ) : (
                        acceptedRequests.map((req) => (
                            <div key={req.id} className="bg-white p-5 rounded-lg shadow">
                                <p><strong>Categorie:</strong> {req.category}</p>
                                <p><strong>Descriere:</strong> {req.description}</p>
                                <p><strong>Adresă:</strong> {req.address}</p>
                                <p><strong>Ora:</strong> {req.time}</p>
                                <p><strong>Status:</strong> {req.status}</p>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
