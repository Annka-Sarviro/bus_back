const { RequestError } = require("../../helpers");
const { getCityByIdService } = require("../../services/city/cityServices");

const getCityByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const city = await getCityByIdService(id);

  if (!city) {
    return res.status(404).json({ message: "city with such id not found" });
  }

  return res.status(200).json({ city });
};

module.exports = getCityByIdCTRL;
