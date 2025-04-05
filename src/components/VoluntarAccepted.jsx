import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import NavBar from "./NavBar";

export default function VoluntarAccepted() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const q = query(
                    collection(db, "requests"),
                    where("status", "==", "accepted"),
                    where("volunteerId", "==", user.uid)
                );

                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRequests(data);
                setLoading(false);
            } catch (error) {
                console.error("Eroare la încărcarea cererilor acceptate:", error);
            }
        };

        fetchAcceptedRequests();
    }, []);

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="voluntar" />

            <main className="pt-28 px-6">
                <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
                    Cererile tale acceptate
                </h1>

                {loading ? (
                    <p className="text-center text-gray-600">Se încarcă cererile...</p>
                ) : requests.length === 0 ? (
                    <p className="text-center text-gray-500">Nu ai acceptat nicio cerere momentan.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {requests.map((req) => (
                            <div key={req.id} className="bg-white shadow-md rounded-lg p-5">
                                <p><strong>Categorie:</strong> {req.category}</p>
                                <p><strong>Descriere:</strong> {req.description}</p>
                                <p><strong>Adresă:</strong> {req.address}</p>
                                <p><strong>Telefon:</strong> {req.phone || "-"}</p>
                                <p><strong>Ora:</strong> {req.time}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
