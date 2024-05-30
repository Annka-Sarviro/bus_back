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
  bus: {
    type: Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
  rout: {
    type: Schema.Types.ObjectId,
    ref: "Rout",
    required: true,
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
});

const Ticket = model("ticket", ticketSchema);
const ticketSchemaJoi = Joi.object({
  seat_number: Joi.number().required(),
  status: Joi.array().items(Joi.string().valid("new", "blocked", "reserve", "ordered")).default("new"),

  user: Joi.string(),
  order_id: Joi.string(),
  price: Joi.number(),
  ordered_data: Joi.date().iso(),
});

module.exports = {
  Ticket,
  ticketSchemaJoi,
};
