const { RequestError } = require("../../helpers");
const { Journey } = require("../../models/journey");
const { updateJourneySeatsService } = require("../../services/journey/journeyServices");

const updateJourneySeatsByIdCTRL = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw RequestError(404, "please add id");
    }

    const new_status = req.body.new_status;
    const seat_number = req.body.seat_number;

    const journey = await Journey.findById(id);

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    const updatedJourney = await updateJourneySeatsService(id, seat_number, new_status);

    if (updatedJourney.length <= 0) {
      return res.status(404).json({ message: "Seats with such seat_number not found" });
    }

    return res.status(200).json({ message: "successful" });
  } catch (error) {
    throw RequestError(404, error.message);
  }
};

module.exports = updateJourneySeatsByIdCTRL;
