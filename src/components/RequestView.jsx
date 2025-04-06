import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import RequestContainer from "./RequestContainer";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function RequestView() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "requests"));
        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((req) => req.status === "pending");

        const priorityMap = {
          Diamond: 1,
          Gold: 2,
          Silver: 3,
        };

        const sorted = data.sort((a, b) => {
          const pa = priorityMap[a.package] || 999;
          const pb = priorityMap[b.package] || 999;
          return pa - pb;
        });

        setRequests(sorted);
        setFilteredRequests(sorted);
        setLoading(false);
      } catch (error) {
        console.error("Eroare la încărcarea cererilor:", error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const normalizeText = (text) =>
      text
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ș|ş/g, "s")
        .replace(/ț|ţ/g, "t")
        .replace(/ă/g, "a")
        .replace(/î/g, "i")
        .replace(/â/g, "a")
        .toLowerCase();

    let filtered = [...requests];

    if (categoryFilter.trim() !== "") {
      const catSearch = normalizeText(categoryFilter);
      filtered = filtered.filter((req) =>
        normalizeText(req.category).includes(catSearch)
      );
    }

    if (addressFilter.trim() !== "") {
      const addrSearch = normalizeText(addressFilter);
      filtered = filtered.filter((req) =>
        normalizeText(req.address).includes(addrSearch)
      );
    }

    setFilteredRequests(filtered);
  }, [categoryFilter, addressFilter, requests]);


  const handleAcceptRequest = async (requestId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Trebuie să fii autentificat pentru a accepta o cerere.");
        return;
      }

      const requestRef = doc(db, "requests", requestId);
      await updateDoc(requestRef, {
        status: "accepted",
        volunteerId: user.uid,
      });

      alert("✅ Cererea a fost acceptată cu succes!");
      setFilteredRequests((prev) => prev.filter((r) => r.id !== requestId));
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Eroare la acceptarea cererii:", error);
      alert("❌ A apărut o eroare la acceptare.");
    }
  };

  if (loading) return <p className="p-6">Se încarcă cererile...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <NavBar />

      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-md rounded-2xl p-4 h-fit mt-24">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtrare</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Categorie:</label>
          <input
            type="text"
            placeholder="Ex: Medicamente"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">Adresă:</label>
          <input
            type="text"
            placeholder="Ex: Str. Florilor"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
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
          <p className="text-gray-600">Nicio cerere găsită.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredRequests.map((req) => (
              <RequestContainer
                key={req.id}
                request={req}
                onAccept={handleAcceptRequest}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
