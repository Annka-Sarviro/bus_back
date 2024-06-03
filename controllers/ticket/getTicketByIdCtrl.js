const { RequestError } = require("../../helpers");
const { getTicketByIdService } = require("../../services/ticket/ticketServices");

const getTicketByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const ticket = await getTicketByIdService(id);

  if (!ticket) {
    return res.status(404).json({ message: "ticket with such id not found" });
  }

  return res.status(200).json({ ticket });
};

module.exports = getTicketByIdCTRL;
