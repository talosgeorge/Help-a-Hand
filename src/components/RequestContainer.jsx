export default function RequestContainer({ request, onDelete, onAccept, onComplete, onChat }) {
    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "N/A";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString("ro-RO");
    };

    const packageStyles = {
        Diamond: { image: "/images/diamond.jpg", badge: "bg-blue-600 text-white" },
        Gold: { image: "/images/gold.jpg", badge: "bg-yellow-500 text-white" },
        Silver: { image: "/images/silver.jpg", badge: "bg-gray-600 text-white" },
        Default: { image: null, badge: "bg-gray-400 text-white" },
    };

    const currentPackage = request.package || "Default";
    const styles = packageStyles[currentPackage] || packageStyles.Default;
    const hasBackgroundImage = styles.image !== null;

    return (
        <div
            className={`relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                !hasBackgroundImage ? "bg-white border border-gray-200" : ""
            }`}
            style={
                hasBackgroundImage
                    ? {
                        backgroundImage: `url(${styles.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "300px",
                    }
                    : { minHeight: "300px" }
            }
        >
            {hasBackgroundImage && <div className="absolute inset-0 bg-black bg-opacity-50" />}

            <div
                className={`relative z-10 p-5 flex flex-col justify-between h-full ${
                    hasBackgroundImage ? "text-white" : "text-gray-800"
                }`}
            >
                <div className="grid gap-1 text-sm mb-4">
                    <p><span className="font-semibold">Categorie:</span> {request.category}</p>
                    <p><span className="font-semibold">Descriere:</span> {request.description}</p>
                    <p><span className="font-semibold">Adresă:</span> {request.address}</p>
                    <p><span className="font-semibold">Telefon:</span> {request.phone || "-"}</p>
                    <p><span className="font-semibold">Ora:</span> {request.time}</p>
                    <p><span className="font-semibold">Data:</span> {formatDate(request.createdAt)}</p>
                </div>

                <div className="mt-auto flex flex-wrap justify-between items-center gap-2">
                    {onDelete && (
                        <button
                            onClick={() => onDelete(request.id)}
                            className="text-red-600 text-2xl cursor-pointer hover:text-red-800"
                            title="Șterge cererea"
                        >
                            &times;
                        </button>
                    )}

                    {onAccept && (
                        <button
                            onClick={() => onAccept(request.id)}
                            className="ml-auto bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                        >
                            Acceptă cererea
                        </button>
                    )}

                    {onComplete && (
                        <button
                            onClick={() => onComplete(request.id)}
                            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                        >
                            Cerere finalizată
                        </button>
                    )}

                    {onChat && (
                        <button
                            onClick={() => onChat(request.id)}
                            className="ml-auto bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                        >
                            💬 Deschide chat
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
