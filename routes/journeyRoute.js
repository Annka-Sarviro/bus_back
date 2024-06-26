const express = require("express");

const { journey: ctrl } = require("../controllers");
const { validation, authenticate, isValidId, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { journeySchemaJoi, activeSchemaJoi, seatsSchemaJoi } = require("../models/journey");

const router = express.Router();

router.get("/", asyncWrapper(ctrl.getActiveJourneyCTRL));
router.get("/allJourney", asyncWrapper(ctrl.getAllJourneyCTRL));
router.get("/archiveJourney", asyncWrapper(ctrl.getArchiveJourneyCTRL));
router.get("/:id", isValidId, asyncWrapper(ctrl.getJourneyByIdCTRL));
router.patch(
  "/:id/active",
  authenticate,
  checkStatus(["admin"]),
  isValidId,
  validation(activeSchemaJoi),
  asyncWrapper(ctrl.updateJourneyStatusByIdCTRL)
);
router.patch("/:id/seats", authenticate, isValidId, validation(seatsSchemaJoi), asyncWrapper(ctrl.updateJourneySeatsByIdCTRL));
router.put("/:id", authenticate, isValidId, validation(journeySchemaJoi), asyncWrapper(ctrl.updateJourneyByIdCTRL));
// router.post("/", authenticate, asyncWrapper(ctrl.createJourneyCTRL));

router.post("/", authenticate, checkStatus(["admin"]), validation(journeySchemaJoi), asyncWrapper(ctrl.createJourneyCTRL));
router.delete("/:id", authenticate, isValidId, checkStatus(["admin"]), asyncWrapper(ctrl.removeJourneyCTRL));

module.exports = router;
