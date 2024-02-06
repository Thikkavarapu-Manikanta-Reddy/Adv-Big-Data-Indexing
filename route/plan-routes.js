const express = require("express");
const planController = require("../controller/plan-controller.js");

const planRouter = express.Router();

planRouter.post('', planController.create);
planRouter.get('/:planId', planController.getById);
planRouter.delete('/:planId', planController.delete );

module.exports = planRouter;