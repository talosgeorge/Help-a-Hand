import "./css/navBarCss.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function NavBar() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    setUserData({
                        email: user.email,
                        ...userDoc.data(),
                    });
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <header>
            <nav className="nav-bar">
                <div className="logo">
                    <h2>Help-A-Hand</h2>
                </div>
                <div className="menu-items">
                    <ul>
                        <li>
                            <Link to="/voluntar/requests">Requests</Link>
                        </li>
                        <li className="dropdown">
                            Contul Meu
                            {userData && (
                                <div className="dropdown-content">
                                    <p><strong>Nume:</strong> {userData.nume || "N/A"}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <p><strong>Rol:</strong> {userData.role}</p>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
