const createError = require("http-errors");
const { getBusService } = require("../../services/bus/busServices");

const getAllBusCTRL = async (req, res) => {
  const { page = 1, perPage = 15, ...rest } = req.query;
  const skip = (+page - 1) * +perPage;
  try {
    const bus = await getBusService(skip, perPage, rest);

    if (!bus) {
      return res.status(404).json({ message: "bus not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: bus },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getAllBusCTRL;
