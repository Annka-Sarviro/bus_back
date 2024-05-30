const getAllJourneyCTRL = require("./getAllJourneyCtrl");
const getActiveJourneyCTRL = require("./getActiveJourneyCtrl");
const getArchiveJourneyCTRL = require("./getArchiveJourneyCtrl");
const getJourneyByIdCTRL = require("./getJourneyByIdCtrl");
const updateJourneyByIdCTRL = require("./updateJourneyByIdCtrl");
const createJourneyCTRL = require("./createJourneyCtrl");
const removeJourneyCTRL = require("./removeJourneyCtrl");
const updateJourneyStatusByIdCTRL = require("./updateJourneyStatusByIdCtrl");

module.exports = {
  getAllJourneyCTRL,
  getActiveJourneyCTRL,
  getArchiveJourneyCTRL,
  getJourneyByIdCTRL,
  updateJourneyByIdCTRL,
  createJourneyCTRL,
  removeJourneyCTRL,
  updateJourneyStatusByIdCTRL,
};
