const { Schema, model } = require("mongoose");
const Joi = require("joi");

const pagesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set page name"],
    },
    main_title: {
      type: String,
      required: [true, "Set page title"],
      default: "Main Title",
    },
    main_desc: {
      type: String,
    },
    title1: {
      type: String,
    },
    text1: {
      type: String,
    },
    title2: {
      type: String,
    },
    text2: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { versionKey: false }
);

const Page = model("page", pagesSchema);

const pageSchemaValidation = Joi.object({
  name: Joi.string().required().min(2).max(50),
  main_desc: Joi.string(),
  main_title: Joi.string().required().min(1).max(80),
  title1: Joi.string(),
  title2: Joi.string(),
  text1: Joi.string(),
  text2: Joi.string(),
  img: Joi.string(),
});

module.exports = {
  Page,
  pageSchemaValidation,
};
