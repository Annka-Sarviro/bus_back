const express = require("express");

const { rout: ctrl } = require("../controllers");
const { validation, authenticate, isValidId } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { routSchemaValidation } = require("../models/rout");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllRoutCTRL));
router.get("/popular", asyncWrapper(ctrl.getPopularRoutCTRL));
router.patch("/:id/popular", asyncWrapper(ctrl.updatePopularRoutByIdCTRL));
router.get("/:id", isValidId, asyncWrapper(ctrl.getRoutByIdCTRL));
router.put("/:id", authenticate, isValidId, validation(routSchemaValidation), asyncWrapper(ctrl.updateRoutByIdCTRL));
router.post("/", authenticate, validation(routSchemaValidation), asyncWrapper(ctrl.createRoutCTRL));
router.delete("/:id", authenticate, isValidId, asyncWrapper(ctrl.removeRoutCTRL));

module.exports = router;
