const express = require('express')
const busController =  require('../controllers/BusController');


const busRoute = express.Router();


busRoute.get("/",busController.getAllBuses);
busRoute.post("/addBus",busController.createBus);
busRoute.post("/book",busController.bookSeats);
busRoute.put("/updateBus",busController.updateBus);
busRoute.post("/deleteBus",busController.deleteBus);


module.exports = busRoute;