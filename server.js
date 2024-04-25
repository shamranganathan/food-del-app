const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define zones with their respective base distance and prices
const zones = {
    'A': { baseDistance: 5, basePrice: 10 },
    'B': { baseDistance: 8, basePrice: 15 },
    // Add more zones as needed
};

// Define per km prices for perishable and non-perishable items
const perKmPrice = {
    'perishable': 1.5,
    'non-perishable': 1,
};

// Calculate total price based on distance and item type
const calculateTotalPrice = (zone, distance, itemType) => {
    const zoneData = zones[zone];
    if (!zoneData) {
        throw new Error('Zone not found');
    }

    let totalPrice = zoneData.basePrice;
    if (distance > zoneData.baseDistance) {
        const extraDistance = distance - zoneData.baseDistance;
        const pricePerKm = perKmPrice[itemType] || 1;
        totalPrice += extraDistance * pricePerKm;
    }

    return totalPrice;
};

app.get("/",(req,res)=>{
    return res.status(200).send("<h1>welcome to Food Delivery App </h1>");
});

// Endpoint to calculate total price
app.post('/calculate-price', (req, res) => {
    const { zone, distance, itemType } = req.body;
    if (!zone || !distance || !itemType) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    try {
        const totalPrice = calculateTotalPrice(zone, distance, itemType);
        res.json({ totalPrice });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
