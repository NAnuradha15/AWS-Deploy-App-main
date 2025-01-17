const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); //js middleware
require("dotenv").config();
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0", // Swagger version
      info: {
        title: "Bus Booking API",      // API Title
        version: "1.0.0",              // API Version
        description: "API documentation for Bus Booking System"  // API Description
      },
      servers: [
        {
          url: "http://localhost:5000"  // Your server URL
        }
      ]
    },
    apis: ["./routes/*.js"]  // Path to your API route files for documentation
  };



const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const url = process.env.MONGODB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connection = mongoose.connection;
// 
connection.once("open", () => {
    console.log('\x1b[34m', "MongoDb connected!");
});



const user = require('./routes/User.js');
app.use("/user", user);

const bus = require('./routes/Bus.js');
app.use("/bus", bus);

const Trip = require('./routes/Trip.js');
app.use("/trip", Trip);

// const User = require('./routes/User.js');
// app.use("/User", User);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(port, () => {
    console.log("\x1b[36m%s\x1b[0m", "PORT connected on " + port);
})
// Routes, Controllers, Models
// route contains all the routes, controller contains all the functions which are assosiated with the route
// This is from new server.js