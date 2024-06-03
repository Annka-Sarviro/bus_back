const bcrypt = require("bcryptjs");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;
const { User } = require("../../models/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { password, email, ...rest } = await req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...rest,
    email,
    password: hashPassword,
  });

  const accessTokenLifetime = "15m";
  const refreshTokenLifetime = "7d";

  const payload = {
    id: newUser._id,
  };
  const access_token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: accessTokenLifetime });

  const refresh_token = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: refreshTokenLifetime });
  await User.findByIdAndUpdate(newUser._id, { access_token: access_token, refresh_token: refresh_token });

  res.status(201).json({
    message: "success",
    token: {
      access_token,
      refresh_token,
    },
    data: { result: { _id: newUser._id } },
  });
};

module.exports = register;
