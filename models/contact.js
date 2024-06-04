const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactsSchema = Schema({
  phone_number: {
    type: String,
    required: [true, "Set phone_number"],
  },
  telegram: {
    type: String,
  },
  viber: {
    type: String,
  },
  whats_up: {
    type: String,
  },
});

const contactSchema = Schema({
  address: {
    type: String,
    required: [true, "Set address"],
  },
  email: {
    type: String,
    required: [true, "Set email"],
  },
  weekdays_work: {
    type: String,
    required: [true, "Set weekdays work"],
  },
  weekdays_time: {
    type: String,
    required: [true, "Set weekdays time"],
  },
  weekends: {
    type: String,
    required: [true, "Set weekends"],
  },
  lunch_time: {
    type: String,
    required: [true, "Set weekends"],
  },
  contacts: [contactsSchema],
});

const Contact = model("contact", contactSchema);

const contactsSchemaJoiValidation = Joi.object({
  phone_number: Joi.string().required(),
  telegram: Joi.string(),
  viber: Joi.string(),
  whats_up: Joi.string(),
});

const contactSchemaValidation = Joi.object({
  address: Joi.string().required(),
  email: Joi.string().required(),
  weekdays_work: Joi.string().required(),
  weekdays_time: Joi.string().required(),
  weekends: Joi.string().required(),
  lunch_time: Joi.string().required(),
  contacts: Joi.array().items(contactsSchemaJoiValidation),
});

module.exports = {
  Contact,
  contactSchemaValidation,
};
