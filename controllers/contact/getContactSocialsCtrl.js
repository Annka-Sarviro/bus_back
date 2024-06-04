const createError = require("http-errors");
const { getSocialsService } = require("../../services/contact/contactService");

const getContactSocialsCTRL = async (req, res) => {
  try {
    const contact = await getSocialsService();

    if (!contact) {
      return res.status(404).json({ message: "socials not found" });
    }

    return res.status(200).json({
      message: "success",
      data: { result: contact },
    });
  } catch (error) {
    throw createError(404, error.message);
  }
};

module.exports = getContactSocialsCTRL;
