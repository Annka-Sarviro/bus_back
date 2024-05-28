const { RequestError } = require("../../helpers");
const { updateRoutPopularService } = require("../../services/rout/routServices");

const addRentable = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw RequestError(404, "please add id");
    }
    const is_popular = req.body.is_popular;

    if (typeof is_popular !== "boolean") {
      return res.status(400).json({ message: "Please provide rentable data as a boolean" });
    }

    const updatedBus = await updateRoutPopularService(id, is_popular);

    if (!updatedBus) {
      return res.status(404).json({ message: "Rout with such id not found" });
    }

    return res.status(200).json({ message: "successful", results: res.json({ updatedBus }) });
  } catch (error) {
    throw RequestError(404, error.message);
  }
};

module.exports = addRentable;
