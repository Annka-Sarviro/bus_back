const { RequestError } = require("../../helpers");
const { getJourneyByIdService } = require("../../services/journey/journeyServices");

const getTicketByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const journey = await getJourneyByIdService(id);

  if (!journey) {
    return res.status(404).json({ message: "journey with such id not found" });
  }

  return res.status(200).json({ journey });
};

module.exports = getTicketByIdCTRL;
