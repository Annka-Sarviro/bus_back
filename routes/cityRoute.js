const express = require("express");

const { city: ctrl } = require("../controllers/");
const { validation, authenticate, isValidId, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { citySchemaValidation } = require("../models/city");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllCityCTRL));
router.get("/:id", isValidId, asyncWrapper(ctrl.getCityByIdCTRL));
router.put("/:id", authenticate, isValidId, checkStatus(["admin"]), validation(citySchemaValidation), asyncWrapper(ctrl.updateCityByIdCTRL));
router.post("/", authenticate, checkStatus(["admin"]), validation(citySchemaValidation), asyncWrapper(ctrl.createCityCTRL));
router.delete("/:id", authenticate, isValidId, checkStatus(["admin"]), asyncWrapper(ctrl.removeCityCTRL));

module.exports = router;
