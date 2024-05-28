const { RequestError } = require("../../helpers");
const { getRoutByIdService } = require("../../services/rout/routServices");

const getRoutByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const rout = await getRoutByIdService(id);

  if (!rout) {
    return res.status(404).json({ message: "rout with such id not found" });
  }

  return res.status(200).json({ rout });
};

module.exports = getRoutByIdCTRL;
