const express = require("express");

const { city: ctrl } = require("../controllers/");
const { validation, authenticate, isValidId } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { citySchemaValidation } = require("../models/city");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllCityCTRL));
router.get("/:id", isValidId, asyncWrapper(ctrl.getCityByIdCTRL));
router.put("/:id", authenticate, isValidId, validation(citySchemaValidation), asyncWrapper(ctrl.updateCityByIdCTRL));
router.post("/", authenticate, validation(citySchemaValidation), asyncWrapper(ctrl.createCityCTRL));
router.delete("/:id", authenticate, isValidId, asyncWrapper(ctrl.removeCityCTRL));

module.exports = router;
