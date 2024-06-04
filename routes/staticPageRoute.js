const express = require("express");

const { page: ctrl } = require("../controllers/");
const { validation, authenticate, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { pageSchemaValidation } = require("../models/staticPages");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllPageCTRL));
router.get("/:page_name", asyncWrapper(ctrl.getPageByNameCTRL));
router.put("/:page_name", authenticate, checkStatus(["admin"]), validation(pageSchemaValidation), asyncWrapper(ctrl.updatePageByNameCTRL));
router.post("/", authenticate, checkStatus(["admin"]), validation(pageSchemaValidation), asyncWrapper(ctrl.createPageCTRL));

module.exports = router;
