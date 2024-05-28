const { RequestError } = require("../../helpers");
const { updateBusRentableService } = require("../../services/bus/busServices");

const addFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw RequestError(404, "please add id");
    }
    const rentable = req.body.rentable;

    if (typeof rentable !== "boolean") {
      return res.status(400).json({ message: "Please provide rentable data as a boolean" });
    }

    const updatedBus = await updateBusRentableService(id, rentable);

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus with such id not found" });
    }

    return res.status(200).json({ message: "successful", results: res.json({ updatedBus }) });
  } catch (error) {
    throw RequestError(404, error.message);
  }
};

module.exports = addFavorite;
