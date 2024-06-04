const { Schema, model } = require("mongoose");

const Joi = require("joi");

const ticketSchema = Schema({
  seat_number: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "blocked", "reserve", "ordered"],
    default: "new",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  journey: {
    type: Schema.Types.ObjectId,
    ref: "Journey",
  },
  order_id: {
    type: String,
  },
  price: {
    type: Number,
  },
  ordered_data: {
    type: Date,
  },
  passenger_type: {
    type: String,
    enum: ["adult", "child"],
    default: "adult",
  },
});

const Ticket = model("ticket", ticketSchema);

const ticketStatusSchema = Joi.object({
  status: Joi.string().valid("new", "blocked", "reserve", "ordered").default("new"),
});

const ticketSchemaJoi = Joi.object({
  seat_number: Joi.number().required(),
  status: Joi.string().valid("new", "blocked", "reserve", "ordered").default("new"),
  journey: Joi.string(),
  user: Joi.string(),
  order_id: Joi.string(),
  price: Joi.number(),
  ordered_data: Joi.date().iso(),
  passenger_type: Joi.string(),
});

module.exports = {
  Ticket,
  ticketSchemaJoi,
  ticketStatusSchema,
};
