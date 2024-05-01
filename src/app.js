const express = require('express');
const cors = require('cors');
const RestaurantRouter = require('./routes/Restaurant');


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static('static'))

app.use(RestaurantRouter);

module.exports = app;