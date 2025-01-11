const mongoose = require('mongoose'); // Import Mongoose

// Define the Bus Schema
const BusSchema = new mongoose.Schema({
    busno: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    routeno: {
        type: String,
        required: true,
        trim: true
    },
    seatingcap: {
        type: Number,
        required: true,
        min: [1, 'Seating capacity must be at least 1'] // Validates minimum seating capacity
    },
    creation_date: { 
        type: Date, 
        default: Date.now // Automatically sets the creation date
    }
});


const Bus = mongoose.model("BusInfo", BusSchema);

module.exports = Bus;
