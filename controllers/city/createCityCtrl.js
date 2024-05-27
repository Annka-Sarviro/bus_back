const { createCityService } = require("../../services/city/cityServices");
const createError = require("http-errors");

const addCityCTRL = async (req, res) => {
  const data = req.body;

  try {
    const newData = { ...data };
    const newCity = await createCityService(newData);

    return res.status(201).json({ newCity });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addCityCTRL;
