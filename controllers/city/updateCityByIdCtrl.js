const { RequestError } = require("../../helpers");

const { updateCityByIdService } = require("../../services/city/cityServices");
const createError = require("http-errors");

const updateCityByIdCTRL = async (req, res) => {
  const { id: cityId } = req.params;

  if (!cityId) {
    throw RequestError(404, "please add id");
  }

  const data = req.body;

  try {
    const newData = { ...data };
    const newCity = await updateCityByIdService(cityId, newData);

    if (!newCity) {
      return res.status(404).json({ message: "City with such id not found" });
    }

    return res.status(200).json({ newCity });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateCityByIdCTRL;
