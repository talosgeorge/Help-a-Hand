import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import RequestContainer from "./RequestContainer";
import NavBar from "./NavBar";
import ChatModal from "./ChatModal";

export default function OwnRequestView() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("pending");
    const [userRole, setUserRole] = useState("");
    const [chatRequestId, setChatRequestId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserRole(data.role);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        };
        fetchUserRole();
    }, []);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const snapshot = await getDocs(collection(db, "requests"));
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const userRequests = data.filter((req) => req.email?.toLowerCase() === user.email?.toLowerCase());
                setRequests(userRequests);
                setFilteredRequests(userRequests.filter((req) => req.status === filterStatus));
                setLoading(false);
            } catch (error) {
                console.error("Error loading requests:", error);
            }
        };
        fetchRequests();
    }, [filterStatus]);

    const handleDeleteRequest = async (requestId) => {
        try {
            await deleteDoc(doc(db, "requests", requestId));
            setRequests((prev) => prev.filter((req) => req.id !== requestId));
            setFilteredRequests((prev) => prev.filter((req) => req.id !== requestId));
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        setFilteredRequests(requests.filter((req) => req.status === status));
    };

    const handleOpenChat = (requestId) => {
        setChatRequestId(requestId);
    };

    const handleCloseChat = () => {
        setChatRequestId(null);
    };

    if (loading) return <p className="p-6">Se încarcă cererile...</p>;

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <NavBar />

            <aside className="w-full lg:w-64 bg-white shadow-md rounded-2xl p-4 h-fit mt-24">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtrare cereri</h2>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => handleFilterChange("pending")}
                        className={`text-left px-3 py-2 rounded-lg font-medium ${filterStatus === "pending"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                        Cereri în așteptare
                    </button>
                    <button
                        onClick={() => handleFilterChange("accepted")}
                        className={`text-left px-3 py-2 rounded-lg font-medium ${filterStatus === "accepted"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                        Cereri acceptate
                    </button>
                </div>
            </aside>

            <section className="flex-1 mt-24">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
                >
                    ← Înapoi
                </button>
                {filteredRequests.length === 0 ? (
                    <p className="text-gray-600">Nu există cereri în această categorie.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredRequests.map((req) => (
                            <RequestContainer
                                key={req.id}
                                request={req}
                                onDelete={userRole === "beneficiar" && filterStatus === "pending" ? handleDeleteRequest : null}
                                onChat={filterStatus === "accepted" ? handleOpenChat : null}
                            />
                        ))}
                    </div>
                )}
            </section>

            {chatRequestId && (
                <ChatModal requestId={chatRequestId} onClose={handleCloseChat} role={userRole} />
            )}
        </div>
    );
}