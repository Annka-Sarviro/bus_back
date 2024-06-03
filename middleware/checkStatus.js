const createError = require("http-errors");

const checkStatus = status => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      throw createError(400, "No user");
    }

    console.log("1", user.id);
    console.log("2", req.params.id);
    // If "current" is included in statuses and user.id matches req.params.id, allow access
    if (status.includes("current") && user.id === req.params.id) {
      return next();
    }

    // If user status is included in the provided statuses, allow access
    if (status.includes(user.status)) {
      return next();
    }

    // If neither condition is met, deny access
    throw createError(400, "No access rights");
  };
};

module.exports = checkStatus;
