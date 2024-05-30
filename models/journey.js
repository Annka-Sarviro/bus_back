const { Schema, model } = require("mongoose");

const Joi = require("joi");

const journeySchema = Schema(
  {
    rout: {
      type: Schema.Types.ObjectId,
      ref: "Rout",
      required: true,
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    departure_date: {
      type: Date,
      required: true,
    },
    arrival_date: {
      type: Date,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

const Journey = model("journey", journeySchema);

const activeSchemaJoi = Joi.object({
  is_active: Joi.boolean().required().messages({
    "boolean.base": "Is active must be a boolean",
    "any.required": "Is_active is required",
  }),
});

const journeySchemaJoi = Joi.object({
  rout: Joi.string().required().messages({
    "string.base": "Route must be a string",
    "string.empty": "Route is required",
    "any.required": "Route is required",
  }),
  bus: Joi.string().required().messages({
    "string.base": "Bus must be a string",
    "string.empty": "Bus is required",
    "any.required": "Bus is required",
  }),
  departure_date: Joi.date().iso().required().messages({
    "date.base": "Departure date must be a valid date",
    "date.format": "Departure date must be in ISO format",
    "any.required": "Departure date is required",
  }),
  arrival_date: Joi.date().iso().required().messages({
    "date.base": "Arrival date must be a valid date",
    "date.format": "Arrival date must be in ISO format",
    "any.required": "Arrival date is required",
  }),
  created_at: Joi.date().iso().required().messages({
    "date.base": "Creation date must be a valid date",
    "date.format": "Creation date must be in ISO format",
    "any.required": "Creation date is required",
  }),
  is_active: Joi.boolean().messages({
    "boolean.base": "Is active must be a boolean",
  }),
});

module.exports = {
  Journey,
  journeySchemaJoi,
  activeSchemaJoi,
};
