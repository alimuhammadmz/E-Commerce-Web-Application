const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // for parsing cookie from requests


//Route Imports
const product = require('./routes/productRoutes.js');
const user = require('./routes/userRoutes.js');

app.use('/api/product/', product);
app.use('/api/user/', user);

module.exports = app;
