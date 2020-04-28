const express = require('express');

const createHorseValidator = require('../validators/createHorse');
const horseControllers = require('../controllers/horse');

function routes(Horse) {
  const horseRouter = express.Router();
  const controllers = horseControllers(Horse);

  horseRouter.route('/').post(controllers.createHorse);

  return horseRouter;
}

module.exports = routes;
