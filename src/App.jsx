import Register from "./components/Register"; // dacă ai creat deja componenta
import Login from "./components/Login"; // dacă ai creat deja componenta

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Înregistrare</h1>
                <Register />
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <Login />
            </div>
        </div>
    );
}

// import Login from "./components/Login";
//
// export default function App() {
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-md w-96">
//                 <h1 className="text-2xl font-bold mb-4">Autentificare</h1>
//                 <Login />
//             </div>
//         </div>
//     );
// }

