import React, { useState } from 'react';

export default function CreateRequestContainer() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    time: '',
    address: ''
  });

  // Sugestii pentru autocomplete la adresă
  const addressSuggestions = ["Cluj", "Bucuresti", "Timisoara", "Brasov", "Iasi", "Constanta"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressKeyDown = (e) => {
    if (e.key === "Tab") {
      const match = addressSuggestions.find((s) =>
        s.toLowerCase().startsWith(formData.address.toLowerCase())
      );
      if (match) {
        e.preventDefault(); // oprește trecerea automată la alt câmp
        setFormData((prev) => ({ ...prev, address: match }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request created:', formData);
    // Poți înlocui cu trimitere la backend/Firebase aici
  };

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
            value={formData.address}
            onChange={handleChange}
            onKeyDown={handleAddressKeyDown}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Ex: Cluj, Bucuresti, etc."
            required
          />
          <p className="text-xs text-gray-500 mt-1">Sugestie rapidă: scrie și apasă <kbd>Tab</kbd> pentru completare</p>
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
