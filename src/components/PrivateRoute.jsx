import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase"; // Importă instanța de autentificare din Firebase

// Componentă PrivateRoute care redirecționează utilizatorii neautentificați
const PrivateRoute = () => {
    // Verifică dacă utilizatorul este logat
    const user = auth.currentUser;

    // Dacă nu e logat, redirecționează către pagina de login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Dacă este logat, afișează componenta dorită
    return <Outlet />;
};

export default PrivateRoute;
