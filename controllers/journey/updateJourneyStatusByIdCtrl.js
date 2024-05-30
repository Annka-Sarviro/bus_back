const { RequestError } = require("../../helpers");
const { updateJourneyStatusService } = require("../../services/journey/journeyServices");

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw RequestError(404, "please add id");
    }
    const is_active = req.body.is_active;

    if (typeof is_active !== "boolean") {
      return res.status(400).json({ message: "Please provide is_active data as a boolean" });
    }

    const updatedJourney = await updateJourneyStatusService(id, is_active);

    if (!updatedJourney) {
      return res.status(404).json({ message: "Journey with such id not found" });
    }

    return res.status(200).json({ message: "successful", results: res.json({ updatedJourney }) });
  } catch (error) {
    throw RequestError(404, error.message);
  }
};

module.exports = updateStatus;
