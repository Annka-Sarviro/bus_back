const express = require("express");

const { bus: ctrl } = require("../controllers/");
const { validation, authenticate, isValidId, upload } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { busSchemaValidation } = require("../models/bus");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllBusCTRL));
router.get("/:id", isValidId, asyncWrapper(ctrl.getBusByIdCTRL));
router.put("/:id", authenticate, isValidId, validation(busSchemaValidation), asyncWrapper(ctrl.updateBusByIdCTRL));
router.patch(
  "/:id/image_list",
  upload.array("image_list"),
  authenticate,
  isValidId,
  validation(busSchemaValidation),
  asyncWrapper(ctrl.updateBusByIdCTRL)
);
router.post("/", authenticate, upload.single("photo"), validation(busSchemaValidation), asyncWrapper(ctrl.createBusCTRL));
router.delete("/:id", authenticate, isValidId, asyncWrapper(ctrl.removeBusCTRL));

module.exports = router;