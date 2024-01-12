//./server/routes/router.js
const express = require('express');
const route = express.Router()
const middlewareController = require('../controller/middlewareController.js');
const services = require('../services/render');
const controller = require('../controller/controller.js');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/home', services.homeRoutes);

/**
 *  @description add trips
 *  @method GET /add-trip
 */
route.get('/add-trip', services.add_trip)

/**
 *  @description for update trip
 *  @method GET /update-trip
 */
route.get('/update-trip', services.update_trip)


// API
route.post('/api/trips',controller.create);
route.get('/api/trips', controller.find);
route.put('/api/trips/:id', controller.update);
route.delete('/api/trips/:id', controller.delete);


module.exports = route