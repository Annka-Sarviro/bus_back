const { RequestError } = require("../../helpers");

const { updateTicketByIdService } = require("../../services/ticket/ticketServices");
const createError = require("http-errors");

const updateTicketByIdCTRL = async (req, res) => {
  const { id: ticketId } = req.params;

  if (!ticketId) {
    throw RequestError(404, "please add id");
  }

  const data = req.body;

  try {
    const newData = { ...data };
    const updateTicket = await updateTicketByIdService(ticketId, newData);

    if (!updateTicket) {
      return res.status(404).json({ message: "ticket with such id not found" });
    }

    return res.status(200).json({ updateTicket });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateTicketByIdCTRL;
