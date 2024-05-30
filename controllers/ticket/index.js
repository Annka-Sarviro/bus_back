const getAllTicketCTRL = require("./getAllTicketCtrl");
const getTicketByStatusCTRL = require("./getTicketByStatusCtrl");
const getTicketByIdCTRL = require("./getTicketByIdCtrl");
const updateTicketByIdCTRL = require("./updateTicketByIdCtrl");
const createTicketCTRL = require("./createTicketCtrl");
const removeTicketCTRL = require("./removeTicketCtrl");
const updateTicketStatusByIdCTRL = require("./updateTicketStatusByIdCtrl");

module.exports = {
  getAllTicketCTRL,
  getTicketByStatusCTRL,
  getTicketByIdCTRL,
  updateTicketByIdCTRL,
  createTicketCTRL,
  removeTicketCTRL,
  updateTicketStatusByIdCTRL,
};
