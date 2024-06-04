const createError = require("http-errors");
// const { getCityService } = require("../../services/city/cityServices");
const { Variable } = require("../../models/variable");

const createVariableCTRL = async (req, res) => {
  const data = req.body;

  try {
    const newData = { ...data };
    const newVariable = new Variable({ ...newData });
    const savedVariable = await newVariable.save();

    if (!savedVariable) {
      return res.status(404).json({ message: "variable not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: savedVariable },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = createVariableCTRL;
