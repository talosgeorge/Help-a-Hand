import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from 'use-places-autocomplete';
  import { useState } from 'react';
  
  export default function CreateRequestContainer() {
    const [formData, setFormData] = useState({
      category: '',
      description: '',
      time: '',
      address: '',
      location: null,
    });
  
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Cerere creată:', formData);
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
  