const express = require("express");

const { city: ctrl } = require("../controllers/");
const { validation, authenticate } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { citySchemaValidation } = require("../models/city");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllCityCTRL));
router.get("/:id", asyncWrapper(ctrl.getCityByIdCTRL));
router.post("/", authenticate, validation(citySchemaValidation), asyncWrapper(ctrl.createCityCTRL));
router.delete("/:id", authenticate, asyncWrapper(ctrl.removeCityCTRL));

module.exports = router;
