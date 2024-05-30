const { Bus } = require("../../models/bus");
const { Rout } = require("../../models/rout");

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
    const newJourney = await createJourneyService(bus, rout, departure_date, arrival_date, is_active);

    return res.status(201).json({ newJourney });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addJourneyCTRL;
