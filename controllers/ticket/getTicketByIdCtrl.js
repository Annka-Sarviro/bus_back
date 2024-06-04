const { RequestError } = require("../../helpers");
const { getTicketByIdService } = require("../../services/ticket/ticketServices");

const getTicketByIdCTRL = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const ticket = await getTicketByIdService(id);
  if (user.status !== "admin" && (!ticket.user || ticket.user._id.toString() !== user._id.toString())) {
    throw RequestError(403, "No access rights");
  }

  if (!ticket) {
    return res.status(404).json({ message: "ticket with such id not found" });
  }

  return res.status(200).json({ ticket });
};

module.exports = getTicketByIdCTRL;
