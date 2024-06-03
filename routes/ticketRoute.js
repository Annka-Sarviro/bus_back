const express = require("express");

const { ticket: ctrl } = require("../controllers");
const { validation, authenticate, isValidId, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { ticketSchemaJoi, ticketStatusSchema } = require("../models/ticket");

const router = express.Router();

router.get("/", checkStatus(["admin"]), asyncWrapper(ctrl.getAllTicketCTRL));
router.get("/:id", isValidId, asyncWrapper(ctrl.getTicketByIdCTRL));
router.put("/:id", authenticate, isValidId, validation(ticketSchemaJoi), asyncWrapper(ctrl.updateTicketByIdCTRL));
router.patch(
  "/:id/status",
  authenticate,
  isValidId,

  validation(ticketStatusSchema),
  asyncWrapper(ctrl.updateTicketStatusByIdCTRL)
);
// router.post("/", authenticate, validation(ticketSchemaJoi), asyncWrapper(ctrl.createTicketCTRL));
router.delete("/:id", authenticate, checkStatus(["admin"]), isValidId, asyncWrapper(ctrl.removeTicketCTRL));

module.exports = router;
