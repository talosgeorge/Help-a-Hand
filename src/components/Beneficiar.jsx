import React from 'react';
import NavBarBeneficiar from './NavBarBeneficiar';

export default function Beneficiar() {
    return (
        <div>
            <NavBarBeneficiar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-4">Beneficiar</h1>
                    <p>Pagina destinată beneficiarilor.</p>
                </div>
            </div>
        </div>
    );
}
