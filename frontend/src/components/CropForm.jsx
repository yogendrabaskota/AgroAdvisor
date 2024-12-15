/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const CropForm = () => {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
    });

    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://agroadvisor-digi.onrender.com/api/crops/recommend', formData);
            setResult(response.data.crop);
        } catch (error) {
            console.error('Error recommending crop:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Crop Recommendation System
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { field: 'N', label: 'Nitrogen Content (N)' },
                        { field: 'P', label: 'Phosphorus Content (P)' },
                        { field: 'K', label: 'Potassium Content (K)' },
                        { field: 'temperature', label: 'Temperature (°C)' },
                        { field: 'humidity', label: 'Humidity (%)' },
                        { field: 'ph', label: 'pH Value' },
                        { field: 'rainfall', label: 'Rainfall (mm)' },
                    ].map(({ field, label }) => (
                        <div key={field} className="flex flex-col">
                            <label className="font-medium text-gray-700">{label}</label>
                            <input
                                type="number"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                required
                                className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition duration-300"
                >
                    {loading ? 'Processing...' : 'Recommend Crop'}
                </button>
            </form>
            {result && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center shadow-md">
                    <strong className="text-lg">Recommended Crop:</strong>
                    <p className="text-xl font-bold mt-2">{result}</p>
                </div>
            )}
        </div>
    );
};

export default CropForm;
