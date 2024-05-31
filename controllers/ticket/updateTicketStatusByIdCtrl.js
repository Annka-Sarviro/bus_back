const { RequestError } = require("../../helpers");
const { updateTicketStatusService } = require("../../services/ticket/ticketServices");

const updateTicketStatusByIdCTRL = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw RequestError(404, "please add id");
    }
    const status = req.body.status;

    const updatedTicket = await updateTicketStatusService(id, status);

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket with such id not found" });
    }

    return res.status(200).json({ message: "successful", results: res.json({ updatedTicket }) });
  } catch (error) {
    throw RequestError(404, error.message);
  }
};

module.exports = updateTicketStatusByIdCTRL;
