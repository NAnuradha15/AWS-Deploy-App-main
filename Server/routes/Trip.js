//const express = require('express')
//const TripController =  require('../controllers/TripController');


//const busRoute = express.Router();


//busRoute.get("/",TripController.getAllTrips);
//busRoute.post("/addTrip",TripController.createTrip);
//busRoute.post("/getTripUser",TripController.getTripsByUserId);



//module.exports = busRoute;
const express = require('express');
const TripController = require('../controllers/TripController');

const tripRoute = express.Router();

/**
 * @swagger
 * /trip:
 *   get:
 *     summary: Get all trips
 *     description: Retrieve a list of all trips.
 *     responses:
 *       200:
 *         description: A list of trips.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
tripRoute.get("/", TripController.getAllTrips);

/**
 * @swagger
 * /trip/addTrip:
 *   post:
 *     summary: Add a new trip
 *     description: Create a new trip.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *               route:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               seatsAvailable:
 *                 type: number
 *     responses:
 *       201:
 *         description: Trip created successfully.
 */
tripRoute.post("/addTrip", TripController.createTrip);

/**
 * @swagger
 * /trip/getTripUser:
 *   post:
 *     summary: Get trips by user ID
 *     description: Retrieve all trips booked by a specific user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trips retrieved successfully.
 */
tripRoute.post("/getTripUser", TripController.getTripsByUserId);

module.exports = tripRoute;
