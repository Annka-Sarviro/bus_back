const { RequestError } = require("../../helpers");
const { deleteJourneyByIdService } = require("../../services/journey/journeyServices");

const removeTicketCTRL = async (req, res) => {
  const { id: journeyId } = req.params;

  if (!journeyId) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteJourneyByIdService(journeyId);

  if (!data) {
    return res.status(404).json({ message: "Journey with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = removeTicketCTRL;
