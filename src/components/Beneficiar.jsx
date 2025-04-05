import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import NavBar from './NavBar';
import CreateRequestContainer from './CreateRequestContainer';

export default function Beneficiar() {
    const [email, setEmail] = useState('');
    const [showCreateRequest, setShowCreateRequest] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            setEmail(auth.currentUser.email);
        } else {
            setEmail('Not logged in');
        }
    }, []);

    const handleOpenCreateRequest = () => {
        setShowCreateRequest(true);
    };

    const handleCloseCreateRequest = () => {
        setShowCreateRequest(false);
    };
    console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

    return (
        <div>
            {/* Pasăm funcția către NavBar */}
            <NavBar role="beneficiar" onOpenCreateRequest={handleOpenCreateRequest} />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20">
                <div className="bg-white p-6 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-4">Beneficiar</h1>
                    <p>Pagina destinată beneficiarilor.</p>
                    <p className="mt-4 text-sm text-gray-500">Autentificat ca: {auth.currentUser.email}</p>
                </div>
            </div>

            {/* MODAL - CreateRequestContainer */}
            {showCreateRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={handleCloseCreateRequest}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                        <CreateRequestContainer />
                    </div>
                </div>
            )}
        </div>
    );
}
