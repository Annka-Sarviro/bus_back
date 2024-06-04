const { Page } = require("../../models/staticPages");

const getPageService = async (skip, limit, rest) => {
  const pages = await Page.find({}, "", {}).sort({ date: -1 });

  return pages;
};

const getPageByNameService = async name => {
  const page = await Page.findOne({ name });
  return page;
};

const updatePageByNameService = async (name, newData) => {
  const updatedPage = await Page.findOneAndUpdate({ name }, newData, { new: true, runValidators: true });
  return updatedPage;
};

const createPageService = async newData => {
  const newPage = new Page({ ...newData });
  const savedPage = await newPage.save();
  return savedPage;
};

module.exports = {
  createPageService,
  getPageService,
  getPageByNameService,
  updatePageByNameService,
};
