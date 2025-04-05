import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import NavBar from './NavBar';
import CreateRequestContainer from './CreateRequestContainer';
import PackageContainer from './PackageContainer';

export default function Beneficiar() {
    const [email, setEmail] = useState('');
    const [showCreateRequest, setShowCreateRequest] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

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

    const updateUserPackage = async (pkg) => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            try {
                await updateDoc(userRef, {
                    package: pkg,
                });
                console.log("Pachet salvat:", pkg);
            } catch (error) {
                console.error("Eroare la salvare:", error);
            }
        }
    };

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        updateUserPackage(pkg);
    };

    return (
        <div>
            <NavBar role="beneficiar" onOpenCreateRequest={handleOpenCreateRequest} />

            <div className="min-h-screen bg-gray-100 pt-24 px-6 flex flex-col items-center">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
                    <h1 className="text-2xl font-bold mb-4">Beneficiar</h1>
                    <p>Pagina destinată beneficiarilor.</p>
                    <p className="mt-4 text-sm text-gray-500">Autentificat ca: <strong>{email}</strong></p>
                </div>
            </div>

            {showCreateRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={handleCloseCreateRequest}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                        <CreateRequestContainer
                            onClose={handleCloseCreateRequest}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
