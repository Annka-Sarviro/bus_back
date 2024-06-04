const express = require("express");

const { contact: ctrl } = require("../controllers/");
const { validation, authenticate, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { contactSchemaValidation } = require("../models/contact");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllContactCTRL));
router.get("/socials", asyncWrapper(ctrl.getContactSocialsCTRL));
router.put("/", authenticate, checkStatus(["admin"]), validation(contactSchemaValidation), asyncWrapper(ctrl.updateContactCTRL));
router.post("/", authenticate, checkStatus(["admin"]), validation(contactSchemaValidation), asyncWrapper(ctrl.createContactCTRL));

module.exports = router;
