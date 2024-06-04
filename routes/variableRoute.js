const express = require("express");

const { variable: ctrl } = require("../controllers");
const { validation, authenticate, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { variableJoiSchema, variableUpdateJoiSchema } = require("../models/variable");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getVariableCTRL));
router.patch("/", authenticate, checkStatus(["admin"]), validation(variableUpdateJoiSchema), asyncWrapper(ctrl.updateVariableByIdCTRL));
router.post("/", authenticate, checkStatus(["admin"]), validation(variableJoiSchema), asyncWrapper(ctrl.createVariableCTRL));

module.exports = router;
