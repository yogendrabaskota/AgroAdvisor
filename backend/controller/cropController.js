
const { recommendCrop } = require('../models/cropRecommendationModel');

exports.cropController = async(req, res) => {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    if (!N || !P || !K || !temperature || !humidity || !ph || !rainfall) {
        return res.status(400).json({ 
            message: 'please provide  N, P, K, temperature, humidity, ph, rainfall'
         });
    }

    try {
        const recommendedCrop = recommendCrop({ N, P, K, temperature, humidity, ph, rainfall });
        res.status(200).json({ 
            message : `Best crop for this condition is : ${recommendedCrop}`
         })

    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
}