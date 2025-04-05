import { useEffect, useState } from "react";
import { collection, getDocs, query, where, updateDoc, doc, increment } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function VoluntarAccepted() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchAccepted = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const q = query(collection(db, "requests"), where("volunteerId", "==", user.uid), where("status", "==", "accepted"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(data);
        };

        fetchAccepted();
    }, []);

    const handleFinalize = async (requestId) => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            // ✅ 1. Setează statusul cererii la "completed"
            const requestRef = doc(db, "requests", requestId);
            await updateDoc(requestRef, { status: "completed" });

            // ✅ 2. Incrementează numărul de cereri completate
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                completedRequests: increment(1),
            });

            // ✅ 3. Elimină din UI
            setRequests((prev) => prev.filter((r) => r.id !== requestId));
        } catch (err) {
            console.error("Eroare la finalizare cerere:", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Cererile mele acceptate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests.map((req) => (
                    <div key={req.id} className="bg-white p-4 rounded-lg shadow-md">
                        <p><strong>Categorie:</strong> {req.category}</p>
                        <p><strong>Adresă:</strong> {req.address}</p>
                        <p><strong>Descriere:</strong> {req.description}</p>
                        <p><strong>Ora:</strong> {req.time}</p>
                        <button
                            onClick={() => handleFinalize(req.id)}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            ✅ Cerere finalizată
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
