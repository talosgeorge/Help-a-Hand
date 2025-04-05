import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

export default function Beneficiar() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (auth.currentUser) {
            setEmail(auth.currentUser.email);
        } else {
            setEmail('Not logged in');
        }
    }, []);


    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-4">Beneficiar</h1>
                    <p>Pagina destinată beneficiarilor.</p>
                </div>

                <div className="mb-4">
                    <p className="font-medium text-gray-700">
                        Logged in as: <span className="font-bold">{email}</span>
                    </p>
                </div>


            </div>
        </div>
    );
}
