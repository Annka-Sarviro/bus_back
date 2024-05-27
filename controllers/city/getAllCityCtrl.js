// const { City } = require("../../models/city");
const createError = require("http-errors");
const { getCityService } = require("../../services/city/cityServices");

const getAllCityCTRL = async (req, res) => {
  const { page = 1, perPage = 15, ...rest } = req.query;
  const skip = (+page - 1) * +perPage;
  try {
    const city = await getCityService(skip, perPage, rest);

    if (!city) {
      return res.status(404).json({ message: "city not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: city },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getAllCityCTRL;
