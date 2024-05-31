const { getJourneyByIdService } = require("../../services/journey/journeyServices");
const { createTicketService } = require("../../services/ticket/ticketServices");

const createError = require("http-errors");

const createTicketCTRL = async (req, res) => {
  try {
    const { seat_number, journey, status, price, order_id } = req.body;

    const journey_data = await getJourneyByIdService(journey);

    if (!journey_data) {
      return res.status(404).json({ message: "Journey not found" });
    }

    const newTicket = await createTicketService(seat_number, journey_data, status, price, order_id);

    return res.status(201).json({ newTicket });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = createTicketCTRL;
