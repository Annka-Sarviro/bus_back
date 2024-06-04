const createError = require("http-errors");
const { getContactService } = require("../../services/contact/contactService");

const getAllContactCTRL = async (req, res) => {
  try {
    const contact = await getContactService();

    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: contact },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getAllContactCTRL;
