const { RequestError } = require("../../helpers");

const { updateRoutByIdService } = require("../../services/rout/routServices");
const createError = require("http-errors");

const updateCityByIdCTRL = async (req, res) => {
  const { id: routId } = req.params;

  if (!routId) {
    throw RequestError(404, "please add id");
  }

  const data = req.body;

  try {
    const newData = { ...data };
    const newRout = await updateRoutByIdService(routId, newData);

    if (!newRout) {
      return res.status(404).json({ message: "City with such id not found" });
    }

    return res.status(200).json({ newRout });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateCityByIdCTRL;
