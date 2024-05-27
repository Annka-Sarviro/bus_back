const { Schema, model } = require("mongoose");
const Joi = require("joi");

const citySchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Set city title"],
    },
    address: {
      type: String,
      required: [true, "Set address for city"],
    },
    coord_x: {
      type: Number,
      required: [true, "Set coord_x for city"],
    },
    coord_y: {
      type: Number,
      required: [true, "Set coord_y for city"],
    },
  },
  { versionKey: false }
);

const City = model("city", citySchema);

const citySchemaValidation = Joi.object({
  title: Joi.string().required().min(1).max(48),
  address: Joi.string().required().min(2).max(100),
  coord_x: Joi.number().required(),
  coord_y: Joi.number().required(),
});

module.exports = {
  City,
  citySchemaValidation,
};
