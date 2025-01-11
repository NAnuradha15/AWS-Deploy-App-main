// controllers/userController.js

const User = require("../models/User");

// Controller to get all users excluding 'busadmin'
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ userName: { $ne: 'busadmin' } });
        return res.status(200).json({
            status: "Data Received",
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ status: error.message });
    }
};

// Controller to add a new user
const addUser = async (req, res) => {
    try {
        var { username, password,role } = req.body;

        console.log(req.body)
       
        if (!role){
            role = "user";
        }

        // Basic validation
        if (!username || !password || !role) {
            return res.status(400).json({ status: "Please provide username, password, and role." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ status: "User already exists." });
        }

        const newUser = new User({
            username,
            password,
            role,
        });

        await newUser.save();

        return res.status(200).json({ status: "New User added" });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ status: error.message });
    }
};

// Controller to update a user by ID
const updateUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const id = req.params.id;

        // Check if at least one field is provided for update
        if (!username && !password && !role) {
            return res.status(400).json({ message: "At least one field (username, password, role) must be provided for update." });
        }

        const updatedData = { username, password, role };

        // Remove undefined fields from updatedData
        Object.keys(updatedData).forEach(key => updatedData[key] === undefined && delete updatedData[key]);

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Update Successful", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Server Error" });
    }
};

// Controller to delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ status: "User not found" });
        }

        return res.status(200).json({ status: 'Deleted' });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ status: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ status: "Please provide both username and password." });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ status: "Invalid username or password." });
        }

        // Compare the provided password with the hashed password in the database
        console.log(user.password)
        
        if (password === user.password) { 
            console.log("password matched")
        }else{
            return res.status(401).json({ status: "error", message: "Invalid username or password." });
        }
        
        // Initialize session
        const logindata =  {
            id: user._id,
            username: user.username,
            role: user.role,
        };

        return res.status(200).json({ status: "Login successful", user: logindata });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ status: "Server error" });
    }
};

// Controller to logout a user
const logoutUser = (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ status: "Server error during logout." });
            }
            res.clearCookie('connect.sid'); // Name might vary based on configuration
            return res.status(200).json({ status: "Logout successful." });
        });
    } else {
        return res.status(400).json({ status: "No active session found." });
    }
};





module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
};
