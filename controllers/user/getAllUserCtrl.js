const createError = require("http-errors");
const { getUserService } = require("../../services/user/userServices");

const getAllUserCTRL = async (req, res) => {
  const { page = 1, perPage = 15, status, ...rest } = req.query;
  const skip = (+page - 1) * +perPage;
  try {
    const users = await getUserService(skip, perPage, status, rest);

    if (!users) {
      return res.status(404).json({ message: "tickets not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: users },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getAllUserCTRL;
