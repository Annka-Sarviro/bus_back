const { Schema, model } = require("mongoose");

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

module.exports = {
  City,
};
