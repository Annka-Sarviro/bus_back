const { RequestError } = require("../../helpers");

const { updateJourneyByIdService } = require("../../services/journey/journeyServices");
const createError = require("http-errors");

const updateTicketByIdCTRL = async (req, res) => {
  const { id: journeyId } = req.params;

  if (!journeyId) {
    throw RequestError(404, "please add id");
  }

  const data = req.body;

  try {
    const newData = { ...data };
    const updateJourney = await updateJourneyByIdService(journeyId, newData);

    if (!updateJourney) {
      return res.status(404).json({ message: "JourneyId with such id not found" });
    }

    return res.status(200).json({ updateJourney });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateTicketByIdCTRL;
