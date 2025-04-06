export default function RequestContainer({ request, onDelete, onAdd }) {
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("ro-RO");
  };

  const packageStyles = {
    Diamond: {
      image: "/images/diamond.jpg",
      badge: "bg-blue-600 text-white",
    },
    Gold: {
      image: "/images/gold.jpg",
      badge: "bg-yellow-500 text-white",
    },
    Silver: {
      image: "/images/silver.jpg",
      badge: "bg-gray-600 text-white",
    },
    Default: {
      image: null, // fără imagine
      badge: "bg-gray-400 text-white",
    },
  };

  const currentPackage = request.package || "Default";
  const styles = packageStyles[currentPackage] || packageStyles.Default;
  const hasBackgroundImage = styles.image !== null;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
        !hasBackgroundImage ? "bg-white border border-gray-200" : ""
      }`}
      style={
        hasBackgroundImage
          ? {
              backgroundImage: `url(${styles.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {hasBackgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}

      <div className={`relative z-10 p-5 ${hasBackgroundImage ? "text-white" : "text-gray-800"}`}>
        <div className="grid gap-1 text-sm">
          <p>
            <span className="font-semibold">Categorie:</span> {request.category}
          </p>
          <p>
            <span className="font-semibold">Descriere:</span> {request.description}
          </p>
          <p>
            <span className="font-semibold">Adresă:</span> {request.address}
          </p>
          <p>
            <span className="font-semibold">Telefon:</span> {request.phone || "-"}
          </p>
          <p>
            <span className="font-semibold">Ora:</span> {request.time}
          </p>
          <p>
            <span className="font-semibold">Data:</span> {formatDate(request.createdAt)}
          </p>
        </div>

        {/* Buton pentru beneficiar: roșu */}
        {onDelete && (
          <button
            onClick={() => onDelete(request.id)}
            className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer hover:text-red-800"
          >
            &times;
          </button>
        )}

        {/* Buton pentru voluntar: verde */}
        {onAdd && (
          <button
            onClick={() => onAdd(request.id)}
            className="absolute top-2 right-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-green-600"
          >
            + 
          </button>
        )}
      </div>
    </div>
  );
}
