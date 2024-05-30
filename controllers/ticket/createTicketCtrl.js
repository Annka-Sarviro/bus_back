const { Bus } = require("../../models/bus");
const { Rout } = require("../../models/rout");
const { Ticket } = require("../../models/ticket");

const { createJourneyService } = require("../../services/journey/journeyServices");
const createError = require("http-errors");

const createTicketCTRL = async (req, res) => {
  try {
    const { bus, rout, departure_date, arrival_date, is_active } = req.body;

    const findBus = await Bus.findById(bus);
    const findRout = await Rout.findById(rout);

    if (!findBus) {
      return res.status(404).json({ message: "Bus  not found" });
    }

    if (!findRout) {
      return res.status(404).json({ message: "Rout not found" });
    }
    if (!departure_date) {
      return res.status(404).json({ message: "Departure Date not found" });
    }

    if (!arrival_date) {
      return res.status(404).json({ message: "Arrival Date not found" });
    }

    const firstFloorTickets = [];
    const secondFloorTickets = [];

    for (let i = 1; i <= findBus.first_floor_seats_count; i++) {
      const newTicket = new Ticket({
        seat_number: i,
        status: "new",
      });
      firstFloorTickets.push(newTicket);
    }

    for (let i = findBus.first_floor_seats_count + 1; i <= findBus.first_floor_seats_count + findBus.second_floor_seats_count; i++) {
      const newTicket = new Ticket({
        seat_number: i,
        status: "new",
      });
      secondFloorTickets.push(newTicket);
    }

    const createdFirstFloorTickets = await Ticket.insertMany(firstFloorTickets);
    const createdSecondFloorTickets = await Ticket.insertMany(secondFloorTickets);

    const newJourney = await createJourneyService(
      bus,
      rout,
      departure_date,
      arrival_date,
      is_active,
      createdFirstFloorTickets,
      createdSecondFloorTickets
    );

    return res.status(201).json({ newJourney });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = createTicketCTRL;
