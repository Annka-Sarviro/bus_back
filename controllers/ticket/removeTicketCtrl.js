const { RequestError } = require("../../helpers");
const { deleteTicketByIdService } = require("../../services/ticket/ticketServices");

const removeTicketCTRL = async (req, res) => {
  const { id: ticketId } = req.params;

  if (!ticketId) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteTicketByIdService(ticketId);

  if (!data) {
    return res.status(404).json({ message: "Ticket with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = removeTicketCTRL;
