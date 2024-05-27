const express = require("express");

const { city: ctrl } = require("../controllers");

const { asyncWrapper } = require("../helpers");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllCity));

module.exports = router;
