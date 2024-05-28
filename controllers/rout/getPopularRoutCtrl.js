const createError = require("http-errors");
const { getPopularRoutService } = require("../../services/rout/routServices");

const getPopularRoutCTRL = async (req, res) => {
  const { page = 1, perPage = 15, ...rest } = req.query;
  const skip = (+page - 1) * +perPage;
  try {
    const popular_routs = await getPopularRoutService(skip, perPage, rest);

    if (!popular_routs) {
      return res.status(404).json({ message: "rout not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: popular_routs },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getPopularRoutCTRL;
