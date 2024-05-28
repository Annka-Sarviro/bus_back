const createError = require("http-errors");
const { getRoutService } = require("../../services/rout/routServices");

const getAllRoutCTRL = async (req, res) => {
  const { page = 1, perPage = 15, ...rest } = req.query;
  const skip = (+page - 1) * +perPage;
  try {
    const routs = await getRoutService(skip, perPage, rest);

    if (!routs) {
      return res.status(404).json({ message: "rout not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: routs },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getAllRoutCTRL;
