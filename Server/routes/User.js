//const express = require('express')
//const userController =  require('../controllers/UserController');


//const userRoute = express.Router();


//userRoute.get("/",userController.getAllUsers);
//userRoute.post("/addUser",userController.addUser);
//userRoute.put("/updateUser",userController.updateUser);
//userRoute.post("/deleteUser",userController.deleteUser);
//userRoute.post('/logout', userController.logoutUser);
//userRoute.post('/login', userController.loginUser);


//module.exports = userRoute;
const express = require('express');
const userController = require('../controllers/UserController');

const userRoute = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
userRoute.get("/", userController.getAllUsers);

/**
 * @swagger
 * /user/addUser:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
userRoute.post("/addUser", userController.addUser);

/**
 * @swagger
 * /user/updateUser:
 *   put:
 *     summary: Update user information
 *     description: Update details of an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
userRoute.put("/updateUser", userController.updateUser);

/**
 * @swagger
 * /user/deleteUser:
 *   post:
 *     summary: Delete a user
 *     description: Remove a user from the system.
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
 *         description: User deleted successfully.
 */
userRoute.post("/deleteUser", userController.deleteUser);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout the currently logged-in user.
 *     responses:
 *       200:
 *         description: User logged out successfully.
 */
userRoute.post('/logout', userController.logoutUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
userRoute.post('/login', userController.loginUser);

module.exports = userRoute;
