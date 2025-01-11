// controllers/busController.js

const Bus = require("../models/Bus"); // Import the Bus model

// Controller to Create a New Bus
const createBus = async (req, res) => {
    try {
        const { busno, owner, routeno, seatingcap } = req.body;

        // Basic Validation
        if (!busno || !owner || !routeno || !seatingcap) {
            return res.status(400).json({ message: "Please provide busno, owner, routeno, and seatingcap." });
        }

        // Check if a bus with the same busno already exists
        const existingBus = await Bus.findOne({ busno });
        if (existingBus) {
            return res.status(400).json({ message: "Bus with this number already exists." });
        }

        // Create a new Bus instance
        const newBus = new Bus({
            busno,
            owner,
            routeno,
            seatingcap
        });

        // Save the Bus to the database
        const savedBus = await newBus.save();

        // Respond with the saved Bus
        res.status(201).json({ message: "Bus created successfully.", bus: savedBus });
    } catch (error) {
        console.error("Error creating bus:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Controller to Get All Buses
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json({ message: "Buses retrieved successfully.", buses });
    } catch (error) {
        console.error("Error fetching buses:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const updateBus = async (req, res) => {
    try {
        const { busno, owner, routeno, seatingcap } = req.body;
        const busId = req.body; // Assuming the bus ID is sent as a URL parameter

        // Check if at least one field is provided for update
        if (!busno && !owner && !routeno && seatingcap === undefined) {
            return res.status(400).json({ message: "At least one field (busno, owner, routeno, seatingcap) must be provided for update." });
        }

        const updatedData = {};

        if (busno) updatedData.busno = busno;
        if (owner) updatedData.owner = owner;
        if (routeno) updatedData.routeno = routeno;
        if (seatingcap !== undefined) {
            if (typeof seatingcap !== 'number' || seatingcap < 0) {
                return res.status(400).json({ message: "seatingcap must be a non-negative number." });
            }
            updatedData.seatingcap = seatingcap;
        }

        // If busno is being updated, check for uniqueness
        if (busno) {
            const existingBus = await Bus.findOne({ busno });
            if (existingBus && existingBus._id.toString() !== busId) {
                return res.status(400).json({ message: "Another bus with this busno already exists." });
            }
        }

        // Find the bus by ID and update it
        const updatedBus = await Bus.findByIdAndUpdate(busId, updatedData, { new: true, runValidators: true });

        if (!updatedBus) {
            return res.status(404).json({ message: "Bus not found." });
        }

        res.status(200).json({ message: "Bus updated successfully.", bus: updatedBus });
    } catch (error) {
        console.error("Error updating bus:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const bookSeats = async (req, res) => {
    try {
        const { busId, seats } = req.body; // Extract busId and seats from the request body
        // Basic Validation
        if (!busId || seats === undefined) {
            return res.status(400).json({ message: "Please provide busId and seats." });
        }

        // Validate busId format (24-character hexadecimal string)
        if (!busId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid busId format." });
        }

        // Validate that seats is a positive integer
        const seatsToBook = parseInt(seats, 10);
        if (isNaN(seatsToBook) || seatsToBook <= 0) {
            return res.status(400).json({ message: "Seats must be a positive integer." });
        }

        // Find the bus by ID
        const bus = await Bus.findById(busId);

        if (!bus) {
            return res.status(404).json({ message: "Bus not found." });
        }

        // Check if there are enough seats available
        if (bus.seatingcap < seatsToBook) {
            return res.status(400).json({ message: `Only ${bus.seatingcap} seat(s) available.` });
        }

        // Subtract the booked seats from seatingcap
        bus.seatingcap -= seatsToBook;

        // Save the updated bus
        await bus.save();

        // Respond with the updated bus information
        res.status(200).json({ 
            message: "Seats booked successfully.", 
            bus: {
                busId: bus._id,
                busno: bus.busno,
                owner: bus.owner,
                routeno: bus.routeno,
                seatingcap: bus.seatingcap
            }
        });
    } catch (error) {
        console.error("Error booking seats:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Controller to Delete a Bus by ID
const deleteBus = async (req, res) => {
    try {
        const busId = req.params.id;

        // Find the bus by ID and delete it
        const deletedBus = await Bus.findByIdAndDelete(busId);

        if (!deletedBus) {
            return res.status(404).json({ message: "Bus not found." });
        }

        res.status(200).json({ message: "Bus deleted successfully." });
    } catch (error) {
        console.error("Error deleting bus:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    createBus,
    getAllBuses,
    updateBus,
    deleteBus,
    bookSeats
};
