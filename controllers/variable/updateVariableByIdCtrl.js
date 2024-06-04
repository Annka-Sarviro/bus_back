const createError = require("http-errors");
const { Variable } = require("../../models/variable");

const updateVariableByIdCTRL = async (req, res) => {
  const data = req.body;

  try {
    const newData = { ...data };
    const updatedVariable = await Variable.findOneAndUpdate({}, newData, { new: true, runValidators: true });

    if (!updatedVariable) {
      return res.status(404).json({ message: "Variable with such id not found" });
    }

    return res.status(200).json({ updatedVariable });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateVariableByIdCTRL;
