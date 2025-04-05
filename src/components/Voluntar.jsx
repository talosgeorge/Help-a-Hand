import React from 'react';
import NavBar from './NavBar';

export default function Voluntar() {
    return (

        <>
            <NavBar role="voluntar" />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-4">Voluntar</h1>
                    <p>Pagina destinată voluntarilor.</p>
                </div>
            </div>
        </>
    );
}
