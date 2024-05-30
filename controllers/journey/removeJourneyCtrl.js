const { RequestError } = require("../../helpers");
const { deleteRoutByIdService } = require("../../services/rout/routServices");

const removeRoutCTRL = async (req, res) => {
  const { id: routId } = req.params;

  if (!routId) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteRoutByIdService(routId);

  if (!data) {
    return res.status(404).json({ message: "Rout with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = removeRoutCTRL;
