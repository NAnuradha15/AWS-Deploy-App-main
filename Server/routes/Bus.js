//const express = require('express')
//const busController =  require('../controllers/BusController');


//const busRoute = express.Router();


//busRoute.get("/",busController.getAllBuses);
//busRoute.post("/addBus",busController.createBus);
//busRoute.post("/book",busController.bookSeats);
//busRoute.put("/updateBus",busController.updateBus);
//busRoute.post("/deleteBus",busController.deleteBus);


//module.exports = busRoute;
const express = require('express');
const busController = require('../controllers/BusController');

const busRoute = express.Router();

/**
 * @swagger
 * /bus:
 *   get:
 *     summary: Get all buses
 *     description: Retrieve a list of all buses.
 *     responses:
 *       200:
 *         description: A list of buses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
busRoute.get("/", busController.getAllBuses);

/**
 * @swagger
 * /bus/addBus:
 *   post:
 *     summary: Add a new bus
 *     description: Add a new bus to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Bus created successfully.
 */
busRoute.post("/addBus", busController.createBus);

/**
 * @swagger
 * /bus/book:
 *   post:
 *     summary: Book seats on a bus
 *     description: Book available seats on a bus.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *               seats:
 *                 type: number
 *     responses:
 *       200:
 *         description: Seats booked successfully.
 */
busRoute.post("/book", busController.bookSeats);

/**
 * @swagger
 * /bus/updateBus:
 *   put:
 *     summary: Update bus details
 *     description: Update information about a specific bus.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *               busNumber:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Bus updated successfully.
 */
busRoute.put("/updateBus", busController.updateBus);

/**
 * @swagger
 * /bus/deleteBus:
 *   post:
 *     summary: Delete a bus
 *     description: Remove a bus from the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bus deleted successfully.
 */
busRoute.post("/deleteBus", busController.deleteBus);

module.exports = busRoute;
