const express = require('express')
const TripController =  require('../controllers/TripController');


const busRoute = express.Router();


busRoute.get("/",TripController.getAllTrips);
busRoute.post("/addTrip",TripController.createTrip);
busRoute.post("/getTripUser",TripController.getTripsByUserId);



module.exports = busRoute;