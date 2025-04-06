import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import RequestContainer from "./RequestContainer";
import NavBar from "./NavBar";

export default function BeneficiarHistory() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompletedRequests = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const q = query(
                collection(db, "requests"),
                where("email", "==", user.email.toLowerCase()),
            where("status", "==", "completed")
            );

            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRequests(data);
            setLoading(false);
        };

        fetchCompletedRequests();
    }, []);

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <NavBar role="beneficiar" />

            <main className="pt-28 px-6 flex flex-col items-center">
                <div className="w-full max-w-4xl text-center mb-6">
                    <h1 className="text-3xl font-bold text-green-700 mb-2">Istoric Cereri</h1>
                    <p className="text-gray-600">Aici găsești cererile tale finalizate</p>
                </div>

                {loading ? (
                    <p className="text-gray-500">Se încarcă cererile...</p>
                ) : requests.length === 0 ? (
                    <p className="text-gray-600">Nu există cereri finalizate momentan.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                        {requests.map((req) => (
                            <RequestContainer key={req.id} request={req} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
