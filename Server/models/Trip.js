const mongoose = require('mongoose'); // Import Mongoose

// Define the Bus Schema
const TripSchema = new mongoose.Schema({
    busno: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    booked: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        required: true,
        trim: true
    },
    creation_date: { 
        type: Date, 
        default: Date.now // Automatically sets the creation date
    }
});


const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
