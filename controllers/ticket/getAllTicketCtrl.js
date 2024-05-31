const createError = require("http-errors");
const { getTicketsService } = require("../../services/ticket/ticketServices");

const getAllTicketCTRL = async (req, res) => {
  const { page = 1, perPage = 15, status, ...rest } = req.query;
  const skip = (+page - 1) * +perPage;
  try {
    const tickets = await getTicketsService(skip, perPage, status, rest);

    if (!tickets) {
      return res.status(404).json({ message: "tickets not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: tickets },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getAllTicketCTRL;
