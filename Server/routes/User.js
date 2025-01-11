const express = require('express')
const userController =  require('../controllers/UserController');


const userRoute = express.Router();


userRoute.get("/",userController.getAllUsers);
userRoute.post("/addUser",userController.addUser);
userRoute.put("/updateUser",userController.updateUser);
userRoute.post("/deleteUser",userController.deleteUser);
userRoute.post('/logout', userController.logoutUser);
userRoute.post('/login', userController.loginUser);


module.exports = userRoute;