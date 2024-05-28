const { RequestError } = require("../../helpers");

const { updateBusByIdService } = require("../../services/bus/busServices");
const createError = require("http-errors");

const updateBusByIdCTRL = async (req, res) => {
  const { id: cityId } = req.params;

  if (!cityId) {
    throw RequestError(404, "please add id");
  }

  const data = req.body;

  try {
    const newData = { ...data };
    const newBus = await updateBusByIdService(cityId, newData);

    if (!newBus) {
      return res.status(404).json({ message: "Bus with such id not found" });
    }

    return res.status(200).json({ newBus });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateBusByIdCTRL;
