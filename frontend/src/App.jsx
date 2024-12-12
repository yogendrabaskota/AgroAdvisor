/* eslint-disable no-unused-vars */
import React from 'react';
import CropForm from './components/CropForm';

const App = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 text-gray-800">
            <header className="py-6 text-center bg-green-500 text-white shadow-lg">
                <h1 className="text-4xl font-bold">🌾 Crop Recommendation System</h1>
            </header>
            <main className="p-6">
                <CropForm />
            </main>
            <footer className="text-center py-4 bg-green-500 text-white">
                <p>© 2024 Crop Advisor. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
