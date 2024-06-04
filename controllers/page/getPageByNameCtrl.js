const { RequestError } = require("../../helpers");
const { getPageByNameService } = require("../../services/page/pageService");

const getPageByNameCTRL = async (req, res) => {
  const { page_name } = req.params;

  if (!page_name) {
    throw RequestError(404, { message: "please add page name" });
  }

  const page = await getPageByNameService(page_name);

  if (!page) {
    return res.status(404).json({ message: "page with such name not found" });
  }

  return res.status(200).json({ page });
};

module.exports = getPageByNameCTRL;
