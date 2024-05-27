const { RequestError } = require("../../helpers");
const { deleteCityByIdService } = require("../../services/city/cityServices");

const removeCityCTRL = async (req, res) => {
  const { id: cityId } = req.params;

  if (!cityId) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteCityByIdService(cityId);

  if (!data) {
    return res.status(404).json({ message: "User's notice with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = removeCityCTRL;
