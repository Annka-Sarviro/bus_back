const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;
const createError = require("http-errors");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createError(401, "Email or password is wrong");
  }

  const accessTokenLifetime = "15m";
  const refreshTokenLifetime = "7d";

  const payload = {
    id: user._id,
  };
  const access_token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: accessTokenLifetime });

  const refresh_token = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: refreshTokenLifetime });
  await User.findByIdAndUpdate(user._id, { access_token: access_token, refresh_token: refresh_token });

  res.json({
    message: "success",
    token: {
      access_token,
      refresh_token,
    },
  });
};
module.exports = login;
