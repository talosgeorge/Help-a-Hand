// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-green-600">
                Help-a-Hand
            </Link>

            <Link
                to="/beneficiar/request"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
                Create a Request
            </Link>
        </nav>
    );
}
