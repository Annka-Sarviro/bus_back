const { RequestError } = require("../../helpers");

const { updatePageByNameService } = require("../../services/page/pageService");
const createError = require("http-errors");

const updatePageByNameCTRL = async (req, res) => {
  const { page_name } = req.params;

  if (!page_name) {
    throw RequestError(404, "please add page name");
  }

  const data = req.body;

  try {
    const newData = { ...data };
    const newPage = await updatePageByNameService(page_name, newData);

    if (!newPage) {
      return res.status(404).json({ message: "Page with such name not found" });
    }

    return res.status(200).json({ newPage });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updatePageByNameCTRL;
