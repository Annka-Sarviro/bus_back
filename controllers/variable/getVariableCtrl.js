const createError = require("http-errors");
// const { getCityService } = require("../../services/city/cityServices");
const { Variable } = require("../../models/variable");

const getVariableCTRL = async (req, res) => {
  const { variable_name } = req.query;

  try {
    const variable = await Variable.find({});

    if (!variable) {
      return res.status(404).json({ message: "variable not found" });
    }

    if (variable_name) {
      return res.status(200).json({
        message: "success",
        data: { [variable_name]: variable[0][variable_name] },
      });
    }

    return res.status(200).json({
      message: "success",
      data: { result: variable },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getVariableCTRL;
