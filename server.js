const express = require('express'),//Importing Express framework
app = express(),
port = process.env.PORT || 8090;

const lift = require('./routes/liftsimulation.js'); // Importing routes for the products

app.use( lift);

app.listen(port);


console.log(' pickAndDrop API is listening on port: ' + port);