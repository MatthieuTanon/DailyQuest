const express = require('express');
const cors = require('cors');
const questRouter = require('./routes/quest');
const mongoose = require('mongoose');
require('dotenv').config();

import type { RequestHandler } from 'express';

// Create Express App
const app = express();
app.use(cors());
app.use(express.json());

// Security
const AccessControlMiddleware: RequestHandler = (_request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}
app.get(AccessControlMiddleware);

// Routes
app.use('/api/quest', questRouter);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection established'))
    .catch(() => console.log('MongoDB connection failed'));

module.exports = app;