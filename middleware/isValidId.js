const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);

  if (!result) {
    throw createError(404, `${id} is not valid id`);
  }

  next();
};

module.exports = isValidId;
