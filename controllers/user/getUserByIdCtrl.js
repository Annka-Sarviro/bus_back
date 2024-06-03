const { RequestError } = require("../../helpers");
const { getUserByIdService } = require("../../services/user/userServices");

const getUserByIdCTRL = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw RequestError(404, { message: "please add id" });
  }

  const user = await getUserByIdService(id);

  if (!user) {
    return res.status(404).json({ message: "user with such id not found" });
  }

  return res.status(200).json({ user });
};

module.exports = getUserByIdCTRL;
