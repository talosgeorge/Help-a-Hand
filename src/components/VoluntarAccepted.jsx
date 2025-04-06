// ✅ VoluntarAccepted.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    increment
} from "firebase/firestore";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import ChatModal from "./ChatModal"; // 🆕 Import ChatModal

export default function VoluntarAccepted() {
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [activeRequestId, setActiveRequestId] = useState(null);
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
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAcceptedRequests(data);
        };

        fetchAcceptedRequests();
    }, []);

    const handleComplete = async (requestId) => {
        try {
            const requestRef = doc(db, "requests", requestId);
            await updateDoc(requestRef, { status: "completed" });

            const user = auth.currentUser;
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                completedCount: increment(1)
            });

            setAcceptedRequests((prev) => prev.filter((req) => req.id !== requestId));
        } catch (error) {
            console.error("Eroare la finalizare cerere:", error);
        }
    };

    const handleOpenChat = (requestId) => {
        setActiveRequestId(requestId);
        setShowChat(true);
    };

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="voluntar" />

            <main className="pt-28 px-6 flex flex-col items-center">
                <div className="w-full max-w-4xl text-center mb-6">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">Cererile Mele Acceptate</h1>
                    <p className="text-gray-600">Aici vezi cererile pe care le-ai acceptat</p>
                </div>

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
                            <div
                                key={req.id}
                                className="bg-white p-5 rounded-lg shadow flex flex-col justify-between min-h-[360px]"
                            >
                                <div className="mb-4 space-y-1 text-sm text-gray-800">
                                    <p><strong>Categorie:</strong> {req.category}</p>
                                    <p><strong>Descriere:</strong> {req.description}</p>
                                    <p><strong>Adresă:</strong> {req.address}</p>
                                    <p><strong>Ora:</strong> {req.time}</p>
                                </div>

                                <div className="flex flex-col gap-2 mt-auto">
                                    <button
                                        onClick={() => handleOpenChat(req.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
                                    >
                                        💬 Chat cu beneficiar
                                    </button>

                                    <button
                                        onClick={() => handleComplete(req.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                                    >
                                        ✅ Cerere Finalizată
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* CHAT MODAL */}
            {showChat && activeRequestId && (
                <ChatModal
                    requestId={activeRequestId}
                    onClose={() => {
                        setShowChat(false);
                        setActiveRequestId(null);
                    }}
                />
            )}
        </div>
    );
}