const express = require("express");

const { user: ctrl } = require("../controllers");
const { validation, authenticate, isValidId, checkStatus } = require("../middleware");

const { asyncWrapper } = require("../helpers");
const { schemasUser } = require("../models/user");

const router = express.Router();

router.get("/", authenticate, checkStatus(["admin"]), asyncWrapper(ctrl.getAllUserCTRL));
router.get("/current", authenticate, asyncWrapper(ctrl.gerCurrentUserCTRL));
router.get("/:id", authenticate, checkStatus(["admin", "current"]), isValidId, asyncWrapper(ctrl.getUserByIdCTRL));
router.put(
  "/:id",
  authenticate,
  isValidId,
  checkStatus(["admin", "current"]),
  validation(schemasUser.updateJoiSchema),
  asyncWrapper(ctrl.updateUserByIdCTRL)
);
router.delete("/:id", authenticate, checkStatus(["admin", "current"]), isValidId, asyncWrapper(ctrl.removeUserCTRL));

module.exports = router;
