import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import RequestContainer from "./RequestContainer";
import NavBar from "./NavBar";

export default function RequestView() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const [userRole, setUserRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  // Obține rolul utilizatorului curent
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("User role from Firestore:", data.role);
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Obține toate cererile
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "requests"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sortează după pachet (prioritate)
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

  // Handle delete (for beneficiar)
  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, "requests", requestId));
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
      setFilteredRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Handle add (for voluntar) - only logs in console
  const handleAddRequest = (requestId) => {
    console.log("merge", requestId);
  };

  if (loading || roleLoading) return <p className="p-6">Se încarcă cererile...</p>;

  console.log("User role final:", userRole);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <NavBar />

      {/* Sidebar filtrare */}
      <aside className="w-full lg:w-64 bg-white shadow-md rounded-2xl p-4 h-fit mt-24">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Filtrare după categorie
        </h2>
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

      {/* Grid de requesturi */}
      <section className="flex-1 mt-24">
        {filteredRequests.length === 0 ? (
          <p className="text-gray-600">
            Nicio cerere găsită pentru categoria selectată.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredRequests.map((req) => (
              <RequestContainer
                key={req.id}
                request={req}
                onDelete={
                  userRole === "beneficiar" ? handleDeleteRequest : undefined
                }
                onAdd={userRole === "beneficiar" ? undefined : handleAddRequest}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
