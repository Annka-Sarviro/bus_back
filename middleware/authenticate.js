const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User } = require("../models/user");

const { ACCESS_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", access_token = ""] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }

    try {
      const { id } = jwt.verify(access_token, ACCESS_SECRET_KEY);
      const user = await User.findById(id);

      if (!user) {
        throw createError(401, "User not found");
      }

      if (!access_token) {
        throw createError(401, "Not authorized");
      }
      req.user = user;

      next();
    } catch (error) {
      throw createError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
