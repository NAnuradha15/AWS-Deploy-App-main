const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var User = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    creation_date: { 
        type: Date, 
        default: Date.now
    }
    
});

//Export the model
const classFees = mongoose.model("User",User);

module.exports = classFees;