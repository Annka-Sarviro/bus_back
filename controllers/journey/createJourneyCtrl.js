const { Bus } = require("../../models/bus");
const { Rout } = require("../../models/rout");
const { Ticket } = require("../../models/ticket");

const { createJourneyService } = require("../../services/journey/journeyServices");
const createError = require("http-errors");

const addJourneyCTRL = async (req, res) => {
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

    const firstFloorSeats = [];
    const secondFloorSeats = [];

    for (let i = 1; i <= findBus.first_floor_seats_count; i++) {
      const newTicket = new Ticket({
        seat_number: i,
        status: "new",
      });
      firstFloorSeats.push(newTicket);
    }

    for (let i = findBus.first_floor_seats_count + 1; i <= findBus.first_floor_seats_count + findBus.second_floor_seats_count; i++) {
      const newTicket = new Ticket({
        seat_number: i,
        status: "new",
      });
      secondFloorSeats.push(newTicket);
    }

    const savedFirstFloorTickets = await Ticket.insertMany(firstFloorSeats);
    const savedSecondFloorTickets = await Ticket.insertMany(secondFloorSeats);

    const newJourney = await createJourneyService(bus, rout, departure_date, arrival_date, is_active, firstFloorSeats, secondFloorSeats);

    const firstFloorTickets = savedFirstFloorTickets.map(ticket => ({
      ...ticket.toObject(),
      journey: newJourney._id,
    }));

    const secondFloorTickets = savedSecondFloorTickets.map(ticket => ({
      ...ticket.toObject(),
      journey: newJourney._id,
    }));

    // Збереження оновлених квитків
    await Ticket.updateMany({ _id: { $in: firstFloorTickets.map(ticket => ticket._id) } }, { $set: { journey: newJourney._id } });
    await Ticket.updateMany({ _id: { $in: secondFloorTickets.map(ticket => ticket._id) } }, { $set: { journey: newJourney._id } });

    return res.status(201).json({ newJourney });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addJourneyCTRL;
