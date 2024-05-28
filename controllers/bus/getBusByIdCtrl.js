const { RequestError } = require("../../helpers");
const { getBusByIdService } = require("../../services/bus/busServices");

const getCityByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const bus = await getBusByIdService(id);

  if (!bus) {
    return res.status(404).json({ message: "bus with such id not found" });
  }

  return res.status(200).json({ bus });
};

module.exports = getCityByIdCTRL;
