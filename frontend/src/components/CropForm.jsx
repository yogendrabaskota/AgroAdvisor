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
            const response = await axios.post('http://localhost:5000/api/crops/recommend', formData);
            setResult(response.data.crop);
        } catch (error) {
            console.error('Error recommending crop:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Enter Soil Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'].map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="font-medium">{field.toUpperCase()}</label>
                        <input
                            type="number"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded-md mt-5 mb-5"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                    {loading ? 'Processing...' : 'Recommend Crop'}
                </button>
            </form>
            {result && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    <strong>Recommended Crop:</strong> {result}
                </div>
            )}
        </div>
    );
};

export default CropForm;
