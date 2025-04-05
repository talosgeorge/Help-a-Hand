import { useState } from "react";

export default function PackageContainer({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const packages = [
    {
      id: "Silver",
      label: "Silver",
      description: "Pachet Silver",
      image: "/images/silver.jpg"
    },
    {
      id: "Gold",
      label: "Gold",
      description: "Pachet Gold",
      image: "/images/gold.jpg"
    },
    {
      id: "Diamond",
      label: "Diamond",
      description: "Pachet Diamond",
      image: "/images/diamond.jpg"
    }
  ];

  const handleSelect = (pkgId) => {
    setSelected(pkgId);
    if (onSelect) onSelect(pkgId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {packages.map((pkg) => {
        const isSelected = selected === pkg.id;

        return (
          <div
            key={pkg.id}
            onClick={() => handleSelect(pkg.id)}
            className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-300 ${
              isSelected ? "ring-4 ring-green-500 scale-[1.02]" : "hover:ring-2 hover:ring-green-300"
            }`}
          >
            <img
              src={pkg.image}
              alt={pkg.label}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 text-white flex flex-col justify-center items-center p-4">
              <h3 className="text-lg font-bold">{pkg.label}</h3>
              <p className="text-sm">{pkg.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
