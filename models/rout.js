const { Schema, model } = require("mongoose");

const Joi = require("joi");

const stopSchema = new Schema(
  {
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    departure_time: {
      type: Date,
      required: true,
    },
    arrival_time: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stop_number: {
      type: Number,
      required: true,
    },
    is_stop: {
      type: Boolean,
      require: true,
    },
  },
  { _id: false }
);

const placeSchema = Schema(
  {
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    departure_time: {
      type: Date,
    },
    arrival_time: {
      type: Date,
    },
    price: {
      type: Number,
    },
  },
  { _id: false }
);

const routSchema = Schema(
  {
    from_place: placeSchema,
    stops: [stopSchema],
    to_place: placeSchema,
    is_popular: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Rout = model("rout", routSchema);

const stopSchemaJoi = Joi.object({
  city: Joi.string().required(),
  departure_time: Joi.date().iso().required(),
  arrival_time: Joi.date().iso().required(),
  price: Joi.number().required(),
  stop_number: Joi.number().required(),
  is_stop: Joi.boolean().required(),
});

const placeSchemaJoi = Joi.object({
  city: Joi.string().required(),
  departure_time: Joi.date().iso().optional(),
  arrival_time: Joi.date().iso().optional(),
  price: Joi.number().optional(),
});

const routSchemaValidation = Joi.object({
  from_place: placeSchemaJoi.required(),
  stops: Joi.array().items(stopSchemaJoi),
  to_place: placeSchemaJoi.required(),
  is_popular: Joi.boolean(),
});

module.exports = {
  Rout,
  routSchemaValidation,
};
