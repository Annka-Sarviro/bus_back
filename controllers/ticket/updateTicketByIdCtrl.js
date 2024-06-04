const { RequestError } = require("../../helpers");

const { updateTicketByIdService } = require("../../services/ticket/ticketServices");
const createError = require("http-errors");
const { addTicketToUser } = require("../../services/user/userServices");

const updateTicketByIdCTRL = async (req, res) => {
  const { id: ticketId } = req.params;

  if (!ticketId) {
    throw RequestError(404, "please add id");
  }

  const data = req.body;
  const { _id: user_id } = req.user;
  try {
    const newData = { ...data };
    const updateTicket = await updateTicketByIdService(ticketId, newData);

    if (!updateTicket) {
      return res.status(404).json({ message: "ticket with such id not found" });
    }

    if (req.user.status !== "admin" && (!updateTicket.user || updateTicket.user._id.toString() !== user_id.toString())) {
      throw createError(403, "No access rights");
    }

    const user = await addTicketToUser(user_id, ticketId);

    if (!user) {
      return res.status(404).json({ message: "user with such id not found" });
    }

    return res.status(200).json({ updateTicket });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateTicketByIdCTRL;
