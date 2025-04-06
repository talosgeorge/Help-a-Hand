import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useState } from 'react';
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function CreateRequestContainer({ onClose }) {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    time: '',
    address: '',
    location: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    setFormData((prev) => ({ ...prev, address }));

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setFormData((prev) => ({ ...prev, location: { lat, lng } }));
    } catch (error) {
      console.error('Eroare geocodificare:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      // 🧠 Obține pachetul utilizatorului pentru a determina prioritatea
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      const userPackage = userData.package || "None";

      const priorityMap = {
        Diamond: 1,
        Gold: 2,
        Silver: 3
      };
      const priority = priorityMap[userPackage] || 4;

      // 📨 Trimite cererea cu toate câmpurile + prioritate
      await addDoc(collection(db, "requests"), {
        ...formData,
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        phone: userData.phone,
        priority,
        package: userPackage,
        status: "pending" // ✅ nou status adăugat
      });


      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
      }, 2000);

      setFormData({
        category: '',
        description: '',
        time: '',
        address: '',
        location: null,
      });
      setValue('');
    } catch (err) {
      console.error("Eroare la trimiterea cererii:", err);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="w-16 h-16 border-4 border-green-500 rounded-full flex items-center justify-center animate-bounce">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 text-green-600 font-semibold">Cerere trimisă!</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-2xl bg-white">
      <h2 className="text-xl font-bold mb-4">Creează un request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Categorie</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: Mâncare, Transport, etc."
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Descriere</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Descrie cererea ta"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Ora</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Adresă</label>
          <input
            type="text"
            name="address"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Scrie o adresă"
            required
          />
          {status === 'OK' && (
            <ul className="border border-gray-300 rounded-md mt-1 bg-white max-h-40 overflow-y-auto">
              {data.map(({ place_id, description }) => (
                <li
                  key={place_id}
                  onClick={() => handleSelect(description)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {description}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Trimite cererea
        </button>
      </form>
    </div>
  );
}
