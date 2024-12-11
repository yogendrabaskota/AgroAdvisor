const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Load CSV Data
let cropsData = [];

const csvFilePath = path.join(__dirname, '../data/Crop_Recommendation_model.csv');

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        cropsData.push(row);
    })
    .on('end', () => {
        console.log('CSV data loaded successfully.');
    });

// Recommendation Logic
const recommendCrop = ({ N, P, K, temperature, humidity, ph, rainfall }) => {
    // Find the best matching crop from the data
    let recommendedCrop = 'No crop recommendation found';
    let minDifference = Number.MAX_VALUE;

    cropsData.forEach((crop) => {
        const diff = Math.abs(crop.N - N) +
            Math.abs(crop.P - P) +
            Math.abs(crop.K - K) +
            Math.abs(crop.temperature - temperature) +
            Math.abs(crop.humidity - humidity) +
            Math.abs(crop.ph - ph) +
            Math.abs(crop.rainfall - rainfall)

        if (diff < minDifference) {
            minDifference = diff
            recommendedCrop = crop.label
        }
    })

    return recommendedCrop
}

module.exports = { recommendCrop }
