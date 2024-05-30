const { RequestError } = require("../../helpers");
const { Journey } = require("../../models/journey");
const { Ticket } = require("../../models/ticket");
const { deleteJourneyByIdService } = require("../../services/journey/journeyServices");

const removeJourneyCTRL = async (req, res) => {
  const { id: journeyId } = req.params;

  if (!journeyId) {
    throw RequestError(404, "please add id");
  }

  const journey = await Journey.findById(journeyId);
  const tickets = [...journey.seats.first_flour_seats, ...journey.seats.second_flour_seats].flatMap(seat => seat.tickets_id);
  for (const ticket of tickets) {
    await Ticket.findByIdAndDelete(ticket._id);
  }

  if (!journey) {
    return res.status(404).json({ message: "Journey with such id not found" });
  }
  const data = await deleteJourneyByIdService(journeyId);

  if (!data) {
    return res.status(404).json({ message: "Journey with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = removeJourneyCTRL;
