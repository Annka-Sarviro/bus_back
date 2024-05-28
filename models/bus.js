const { Schema, model } = require("mongoose");
const Joi = require("joi");

const imageSchema = new Schema({
  photo: {
    type: String,
    required: false,
  },
});

const busSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set bus name"],
    },
    photo: {
      type: String,
      required: [true, "Set photo for bus"],
    },
    images_list: {
      type: [imageSchema],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    rentable: {
      type: Boolean,
      default: false,
    },
    busIdService: {
      type: [
        {
          type: String,
          enum: ["wifi", "wc", "ac", "plug", "usb", "display", "music"],
        },
      ],
    },
    first_floor_seats: {
      type: [
        {
          seat: {
            type: Number,
            required: false,
          },
          status: {
            type: String,
            required: false,
          },
        },
      ],
    },
    second_floor_seats: {
      type: [
        {
          seat: {
            type: Number,
            required: false,
          },
          status: {
            type: String,
            required: false,
          },
        },
      ],
    },
    plates_number: {
      type: String,
      required: [true, "Set bus numbers"],
    },
    first_floor_seats_count: {
      type: Number,
      required: [true, "Set first floor seats count"],
    },
    second_floor_seats_count: {
      type: Number,
      required: [true, "Set second floor seats count"],
    },
    wc: {
      type: Boolean,
      default: false,
    },
    wc_2: {
      type: Boolean,
      default: false,
    },
    is_wc_working: {
      type: Boolean,
      default: false,
    },
    rows_1: {
      type: Number,
      required: [true, "Set rows 1 configure"],
    },
    rows_2: {
      type: Number,
      required: [true, "Set rows 2 configure"],
    },
    rows_3: {
      type: Number,
      required: [true, "Set rows 3 configure"],
    },
    rows_4: {
      type: Number,
      required: [true, "Set rows 4 configure"],
    },
    rows_5: {
      type: Number,
      required: [true, "Set rows 5 configure"],
    },
    enter_1: {
      type: Boolean,
      default: false,
    },
    enter_2: {
      type: Boolean,
      default: false,
    },
    enter_3: {
      type: Boolean,
      default: false,
    },
    wc_row_1: {
      type: String,
      required: [true, "Set wc row 1 configure"],
    },
    wc_row_2: {
      type: String,
      required: [true, "Set wc row 2 configure"],
    },
  },
  { versionKey: false }
);

const Bus = model("bus", busSchema);

const imageSchemaJoi = Joi.object({
  id: Joi.number().optional(),
  photo: Joi.string().optional(),
});

const floorSeatSchemaJoi = Joi.object({
  seat: Joi.number().optional(),
  status: Joi.string().optional(),
});

const busSchemaValidation = Joi.object({
  name: Joi.string().required().min(1).max(48),
  photo: Joi.string().required(),
  images_list: Joi.array().items(imageSchemaJoi).optional(),
  is_active: Joi.boolean().default(false),
  rentable: Joi.boolean().default(false),
  busIdService: Joi.array().items(Joi.string().valid("wifi", "wc", "ac", "plug", "usb", "display", "music")).required().messages({
    "any.required": "Set busIdService for bus",
    "any.only": 'busIdService can only contain "wifi", "wc", "ac", "plug", "usb", "display" or "music"',
  }),
  first_floor_seats: Joi.array().items(floorSeatSchemaJoi).optional(),
  second_floor_seats: Joi.array().items(floorSeatSchemaJoi).optional(),
  plates_number: Joi.string().required(),
  first_floor_seats_count: Joi.number().required(),
  second_floor_seats_count: Joi.number().required(),
  wc: Joi.boolean().default(false),
  wc_2: Joi.boolean().default(false),
  is_wc_working: Joi.boolean().default(false),
  rows_1: Joi.number().required(),
  rows_2: Joi.number().required(),
  rows_3: Joi.number().required(),
  rows_4: Joi.number().required(),
  rows_5: Joi.number().required(),
  enter_1: Joi.boolean().default(false),
  enter_2: Joi.boolean().default(false),
  enter_3: Joi.boolean().default(false),
  wc_row_1: Joi.string().required(),
  wc_row_2: Joi.string().required(),
});

module.exports = {
  Bus,
  busSchemaValidation,
};
