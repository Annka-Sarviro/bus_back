const { Schema, model } = require("mongoose");

const Joi = require("joi");

const passwordRegex = /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:'"/])*[^\s]{7,32}$/;
const passwordMessage = "Passwords no contain space, min length 7 characters, max 32.";

const userSchema = Schema(
  {
    password: {
      type: String,
      match: passwordRegex,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    first_name: {
      type: String,
      default: "NewUser",
    },
    last_name: {
      type: String,
      default: "NewUser",
    },
    access_token: {
      type: String,
      default: null,
    },
    refresh_token: {
      type: String,
      default: null,
    },

    birthday: {
      type: String,
      default: "01.01.1900",
    },

    phone: {
      type: String,
      default: "No phone",
    },
    ticket: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Ticket",
          required: true,
        },
      ],
    },
    status: {
      type: String,
      enum: ["admin", "worker", "customer", "user"],
      default: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const registerJoiSchema = Joi.object({
  password: Joi.string()
    .trim()
    .regex(passwordRegex)
    .required()
    .messages({
      "string.empty": `password must contain value`,
      "string.pattern.base": `${passwordMessage}`,
    }),
  email: Joi.string().trim().email().required().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
  }),
  first_name: Joi.string().empty(""),
  last_name: Joi.string().empty(""),
  phone: Joi.string().empty(""),
  birthday: Joi.string(),
  access_token: Joi.string(),
  refresh_token: Joi.string(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const refreshJoiSchema = Joi.object({
  refresh_token: Joi.string(),
});

const updateJoiSchema = Joi.object({
  password: Joi.string()
    .trim()
    .regex(passwordRegex)

    .messages({
      "string.empty": `password must contain value`,
      "string.pattern.base": `${passwordMessage}`,
    }),
  email: Joi.string().trim().email().messages({
    "string.base": `email should be a type of string`,
    "string.empty": `email must contain value`,
  }),
  last_name: Joi.string().empty(""),
  first_name: Joi.string().empty(""),
  phone: Joi.string().empty(""),
  birthday: Joi.string().empty(""),
  status: Joi.string().empty(""),
});

const schemasUser = { registerJoiSchema, loginJoiSchema, refreshJoiSchema, updateJoiSchema };

module.exports = {
  User,
  schemasUser,
};
