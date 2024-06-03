const express = require("express");

const { bus: ctrl } = require("../controllers/");
const { validation, authenticate, isValidId, upload, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { busSchemaValidation } = require("../models/bus");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getAllBusCTRL));
router.get("/:id", isValidId, asyncWrapper(ctrl.getBusByIdCTRL));
router.patch("/:id/rentable", authenticate, isValidId, asyncWrapper(ctrl.updateBusRentableByIdCTRL));
router.put("/:id", authenticate, isValidId, checkStatus(["admin"]), validation(busSchemaValidation), asyncWrapper(ctrl.updateBusByIdCTRL));
router.patch(
  "/:id/image_list",
  upload.array("image_list"),
  authenticate,
  isValidId,
  checkStatus(["admin"]),
  validation(busSchemaValidation),
  asyncWrapper(ctrl.updateBusImageListByIdCTRL)
);
router.post("/", authenticate, upload.single("photo"), checkStatus(["admin"]), validation(busSchemaValidation), asyncWrapper(ctrl.createBusCTRL));
router.delete("/:id", authenticate, isValidId, checkStatus(["admin"]), asyncWrapper(ctrl.removeBusCTRL));

module.exports = router;
