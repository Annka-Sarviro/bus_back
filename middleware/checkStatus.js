const createError = require("http-errors");

const checkStatus = status => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      throw createError(400, "No user");
    }

    if (status.includes("current") && user.id === req.params.id) {
      return next();
    }

    if (status.includes(user.status)) {
      return next();
    }

    throw createError(400, "No access rights");
  };
};

module.exports = checkStatus;
