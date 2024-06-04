const { Schema, model } = require("mongoose");

const Joi = require("joi");

const variableSchema = Schema({
  rate_euro_to_uah: {
    type: Number,
    required: true,
  },
  rate_euro_to_usd: {
    type: Number,
    required: true,
  },
  child_discount: {
    type: Number,
    required: true,
    default: 30,
  },
});

const Variable = model("variable", variableSchema);
const variableJoiSchema = Joi.object({
  rate_euro_to_uah: Joi.number().required(),
  rate_euro_to_usd: Joi.number().required(),
  child_discount: Joi.number().required(),
});

const variableUpdateJoiSchema = Joi.object({
  rate_euro_to_uah: Joi.number(),
  rate_euro_to_usd: Joi.number(),
  child_discount: Joi.number(),
});

module.exports = {
  Variable,
  variableJoiSchema,
  variableUpdateJoiSchema,
};
