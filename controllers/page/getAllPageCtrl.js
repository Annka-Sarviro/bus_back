const createError = require("http-errors");
const { getPageService } = require("../../services/page/pageService");

const getAllPageCTRL = async (req, res) => {
  try {
    const pages = await getPageService();

    if (!pages) {
      return res.status(404).json({ message: "pages not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: pages },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getAllPageCTRL;
