import { useState } from "react";

export default function RequestContainer({ request, onDelete }) {
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("ro-RO");
  };

  return (
    <div className="relative border rounded-2xl shadow-md bg-white p-5 hover:shadow-lg transition-all duration-300">
      {/* Butonul "x" pentru ștergere */}
      <button
        onClick={() => onDelete(request.id)} // Apelăm funcția de ștergere
        className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer hover:text-red-800"
      >
        &times;
      </button>

      <div className="grid gap-1 text-sm text-gray-700">
        <p><span className="font-semibold">Categorie:</span> {request.category}</p>
        <p><span className="font-semibold">Descriere:</span> {request.description}</p>
        <p><span className="font-semibold">Adresă:</span> {request.address}</p>
        <p><span className="font-semibold">Telefon:</span> {request.phone}</p>
        <p><span className="font-semibold">Ora:</span> {request.time}</p>
      </div>
    </div>
  );
}
