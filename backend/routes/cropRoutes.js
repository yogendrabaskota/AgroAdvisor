const express = require('express');
const { recommendCrop } = require('../models/cropRecommendationModel');
const router = express.Router();

router.post('/recommend', (req, res) => {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    if (!N || !P || !K || !temperature || !humidity || !ph || !rainfall) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const recommendedCrop = recommendCrop({ N, P, K, temperature, humidity, ph, rainfall });
        res.status(200).json({ crop: recommendedCrop });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
});

module.exports = router;
