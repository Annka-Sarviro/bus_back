const { City } = require("../../models/city");
const { routSchemaValidation } = require("../../models/rout");
const { createRoutService } = require("../../services/rout/routServices");
const createError = require("http-errors");

const addRoutCTRL = async (req, res) => {
  try {
    const { error } = routSchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { from_place, stops, to_place } = req.body;

    const from_city = await City.findById(from_place.city);
    const to_city = await City.findById(to_place.city);
    if (!from_city || !to_city) {
      return res.status(404).json({ message: "One or both of the specified cities not found" });
    }
    if (stops.length > 0) {
      for (const stop of stops) {
        const stop_city = await City.findById(stop.city);
        if (!stop_city) {
          return res.status(404).json({ message: `City not found for stop: ${stop.city}` });
        }
      }
    }
    const newRout = await createRoutService(from_place, stops, to_place);

    return res.status(201).json({ newRout });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addRoutCTRL;
