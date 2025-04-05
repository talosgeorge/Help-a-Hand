import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import RequestContainer from "./RequestContainer";
import NavBar from "./NavBar";

export default function OwnRequestView() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(""); // State for category filter
  const [city, setCity] = useState(""); // State for city filter
  const [userRole, setUserRole] = useState(""); // State for storing user role

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserRole(data.role); // Set user role
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, []);

  // Fetch requests from Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "requests"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(data);
        setFilteredRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading requests:", error);
      }
    };
    fetchRequests();
  }, []);

  // Handle category and city changes
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);

  // Filter requests by category and city
  useEffect(() => {
    const filtered = requests.filter((req) => {
      const matchesCategory = category
        ? req.category && req.category.toLowerCase().includes(category.toLowerCase())
        : true;
      const matchesCity = city
        ? req.address && req.address.toLowerCase().includes(city.toLowerCase())
        : true;
      return matchesCategory && matchesCity;
    });
    setFilteredRequests(filtered);
  }, [category, city, requests]);

  // Delete request
  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, "requests", requestId)); // Delete request from Firestore
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId)); // Update local state
      setFilteredRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId)); // Update filtered requests
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  if (loading) return <p className="p-6">Loading requests...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <NavBar />

      {/* Sidebar filter */}
      <aside className="w-full lg:w-64 bg-white shadow-md rounded-2xl p-4 h-fit mt-24">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by category and city</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="font-medium">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Enter category"
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="city" className="font-medium">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </aside>

      {/* Grid of requests */}
      <section className="flex-1 mt-24">
        {filteredRequests.length === 0 ? (
          <p className="text-gray-600">No requests found matching the filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredRequests.map((req) => (
              <RequestContainer
                key={req.id}
                request={req}
                onDelete={userRole === "beneficiar" ? handleDeleteRequest : null} // Show delete button for "beneficiar"
                onAdd={userRole === "voluntar" ? (requestId) => console.log("merge", requestId) : null} // Show add button for "voluntar"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
