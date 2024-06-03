const { RequestError } = require("../../helpers");

const { updateUserByIdService } = require("../../services/user/userServices");
const createError = require("http-errors");

const updateUserByIdCTRL = async (req, res) => {
  const { id: userId } = req.params;

  if (!userId) {
    throw RequestError(404, "please add id");
  }

  const data = req.body;

  try {
    const newData = { ...data };
    const updateUser = await updateUserByIdService(userId, newData);

    if (!updateUser) {
      return res.status(404).json({ message: "user with such id not found" });
    }

    return res.status(200).json({ updateUser });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateUserByIdCTRL;
