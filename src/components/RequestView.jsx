import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import RequestContainer from "./RequestContainer";
import NavBar from "./NavBar";

export default function RequestView() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Toate");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "requests"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 🔽 Sortează după pachet (prioritate)
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

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "Toate") {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter((req) => req.category === category);
      setFilteredRequests(filtered);
    }
  };

  const categories = ["Toate", ...new Set(requests.map((req) => req.category))];

  if (loading) return <p className="p-6">Se încarcă cererile...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <NavBar />

      {/* Sidebar filtrare */}
      <aside className="w-full lg:w-64 bg-white shadow-md rounded-2xl p-4 h-fit mt-24">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtrare după categorie</h2>
        <div className="flex flex-col gap-2">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryFilter(cat)}
              className={`text-left px-3 py-2 rounded-lg font-medium ${
                selectedCategory === cat
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* Grid requesturi */}
      <section className="flex-1 mt-24">
        {filteredRequests.length === 0 ? (
          <p className="text-gray-600">Nicio cerere găsită pentru categoria selectată.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredRequests.map((req) => (
              <RequestContainer key={req.id} request={req} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
