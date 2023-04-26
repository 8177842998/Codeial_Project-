const express = require('express');

const route = express.Router();

const homeController = require('../controllers/home_controller');

console.log("inside router");//just to check rour is running/ working or not


route.get('/', homeController.home);
module.exports = route;