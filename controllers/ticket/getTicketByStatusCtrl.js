const createError = require("http-errors");
const { getActiveJourneyService } = require("../../services/journey/journeyServices");

const getTicketByStatusCTRL = async (req, res) => {
  const { page = 1, perPage = 15, ...rest } = req.query;
  const skip = (+page - 1) * +perPage;
  try {
    const journeys = await getActiveJourneyService(skip, perPage, rest);

    if (!journeys) {
      return res.status(404).json({ message: "journeys not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: journeys },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getTicketByStatusCTRL;
