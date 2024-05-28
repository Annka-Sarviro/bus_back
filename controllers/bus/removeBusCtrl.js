const { RequestError } = require("../../helpers");
const { deleteBusByIdService } = require("../../services/bus/busServices");

const removeBusCTRL = async (req, res) => {
  const { id: cityId } = req.params;

  if (!cityId) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteBusByIdService(cityId);

  if (!data) {
    return res.status(404).json({ message: "City with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = removeBusCTRL;
