import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import NavBar from './NavBar';

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
            <NavBar role="beneficiar" />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-4">Beneficiar</h1>
                    <p>Pagina destinată beneficiarilor.</p>
                </div>

            </div>
        </div>
    );
}
