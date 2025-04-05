import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import RequestContainer from "./RequestContainer";
import NavBar from "./NavBar";

export default function OwnRequestView() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("Toate");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUserEmail(currentUser.email);
        }
    }, []);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const snapshot = await getDocs(collection(db, "requests"));
                const allRequests = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const ownRequests = allRequests.filter(req => req.email === userEmail);
                setRequests(ownRequests);
                setFilteredRequests(ownRequests);
                setLoading(false);
            } catch (error) {
                console.error("Eroare la încărcarea cererilor:", error);
            }
        };

        if (userEmail) fetchRequests();
    }, [userEmail]);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (category === "Toate") {
            setFilteredRequests(requests);
        } else {
            const filtered = requests.filter(req => req.category === category);
            setFilteredRequests(filtered);
        }
    };

    const categories = ["Toate", ...new Set(requests.map(req => req.category))];

    const deleteRequest = async (requestId) => {
        try {
            // Delete request from Firestore
            const requestRef = doc(db, "requests", requestId);
            await deleteDoc(requestRef);

            // Update the local state to remove the deleted request
            setRequests(requests.filter(req => req.id !== requestId));
            setFilteredRequests(filteredRequests.filter(req => req.id !== requestId));

            alert("Cererea a fost ștearsă!");
        } catch (error) {
            console.error("Eroare la ștergerea cererii:", error);
        }
    };

    if (loading) return <p className="p-6">Se încarcă cererile tale...</p>;

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <NavBar />
            <aside className="w-full lg:w-64 bg-white shadow-md rounded-2xl p-4 h-fit mt-24">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Categoriile tale</h2>
                <div className="flex flex-col gap-2">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`text-left px-3 py-2 rounded-lg font-medium ${selectedCategory === cat
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </aside>

            <section className="flex-1 mt-24">
                {filteredRequests.length === 0 ? (
                    <p className="text-gray-600">Nu ai cereri în această categorie.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredRequests.map((req) => (
                            <div key={req.id} className="relative">
                                <RequestContainer request={req} />
                                <button
                                    onClick={() => deleteRequest(req.id)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                                >
                                    Șterge
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
