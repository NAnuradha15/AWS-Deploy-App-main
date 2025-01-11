
const Trip = require("../models/Trip"); // Import the Trip model



const createTrip = async (req, res) => {
    try {
        const {  busno, date, booked, user } = req.body;

        // Basic Validation
        if (!busno || !date || !booked || !user) {
            return res.status(400).json({ message: "Please provide busno, date, booked, and user." });
        }

    
        // Create a new Trip instance
        const newTrip = new Trip({
            busno,
            date,
            booked,
            user
        });

        const savedTrip = await newTrip.save();


        res.status(201).json({ message: "Trip created successfully.", trip: savedTrip });
    } catch (error) {
        console.error("Error creating trip:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json({ message: "Trips retrieved successfully.", trips });
    } catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




/**
 * Controller to Delete a Trip by ID

 */
const deleteTrip = async (req, res) => {
    try {
        const tripId = req.params.id;

       
        // Find the trip by ID and delete it
        const deletedTrip = await Trip.findByIdAndDelete(tripId);

        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found." });
        }

        res.status(200).json({ message: "Trip deleted successfully." });
    } catch (error) {
        console.error("Error deleting trip:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const getTripsByUserId = async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from request body

        console.log(userId);

        // Basic Validation
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Fetch trips where the 'user' field matches the provided userId
        const userTrips = await Trip.find({ user: userId });

        if (userTrips.length === 0) {
            return res.status(404).json({ message: "No trips found for this user." });
        }

        // Respond with the retrieved trips
        res.status(200).json({ message: "Trips retrieved successfully.", trips: userTrips });
    } catch (error) {
        console.error("Error fetching trips by user ID:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    createTrip,
    getAllTrips,
    deleteTrip,
    getTripsByUserId
};
