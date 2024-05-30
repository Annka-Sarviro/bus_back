const { Schema, model } = require("mongoose");

const Joi = require("joi");

const seatSchema = Schema({
  seat_number: {
    type: Number,
  },
  tickets_id: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "blocked", "reserve", "ordered"],
    default: "new",
  },
});
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
    seats: {
      first_flour_seats: [seatSchema],
      second_flour_seats: [seatSchema],
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

const seatsSchemaJoi = Joi.object({
  new_status: Joi.string().required().messages({
    "boolean.base": "new_status must be a string",
    "any.required": "new_status is required",
  }),
  seat_number: Joi.number().required().messages({
    "boolean.base": "seat_number must be a number",
    "any.required": "seat_number is required",
  }),
});

const seatSchemaJoi = Joi.object({
  tickets_id: Joi.string().required(),
  seat: Joi.number().messages({
    "number.base": "Seat must be a number",
    "any.required": "Seat is required",
  }),
  status: Joi.string().valid("empty", "occupied", "reserved", "wc").required().messages({
    "string.base": "Status must be a string",
    "any.only": "Status must be one of [empty, occupied, reserved, wc]",
    "any.required": "Status is required",
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
  seats: Joi.object({
    first_flour_seats: Joi.array().items(seatSchemaJoi).messages({
      "array.base": "First floor seats must be an array",
    }),
    second_flour_seats: Joi.array().items(seatSchemaJoi).messages({
      "array.base": "Second floor seats must be an array",
    }),
  }).messages({
    "object.base": "Seats must be an object",
    "any.required": "Seats are required",
  }),
});

module.exports = {
  Journey,
  journeySchemaJoi,
  activeSchemaJoi,
  seatsSchemaJoi,
};
