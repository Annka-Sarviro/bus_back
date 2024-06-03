const { RequestError } = require("../../helpers");
const { deleteUserByIdService } = require("../../services/user/userServices");

const removeUserCTRL = async (req, res) => {
  const { id: userId } = req.params;

  if (!userId) {
    throw RequestError(404, "please add id");
  }

  const data = await deleteUserByIdService(userId);

  if (!data) {
    return res.status(404).json({ message: "User with such id not found" });
  }

  return res.status(200).json({ message: "successful" });
};

module.exports = removeUserCTRL;
