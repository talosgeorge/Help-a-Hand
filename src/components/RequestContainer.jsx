export default function RequestContainer({ request }) {
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "N/A";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("ro-RO");
  };

  return (
    <div className="border rounded-2xl shadow-md bg-white p-5 hover:shadow-lg transition-all duration-300">
      <div className="grid gap-1 text-sm text-gray-700">
        <p><span className="font-semibold">Categorie:</span> {request.category}</p>
        <p><span className="font-semibold">Descriere:</span> {request.description}</p>
        <p><span className="font-semibold">Adresă:</span> {request.address}</p>
        <p><span className="font-semibold">Telefon:</span> {request.phone} </p>
        <p><span className="font-semibold">Ora:</span> {request.time}</p>
      </div>
    </div>
  );
}
