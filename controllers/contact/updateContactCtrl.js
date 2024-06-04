const { updateContactService } = require("../../services/contact/contactService");
const createError = require("http-errors");

const updateContactCTRL = async (req, res) => {
  const data = req.body;

  try {
    const newData = { ...data };
    const newContact = await updateContactService(newData);

    if (!newContact) {
      return res.status(404).json({ message: "Contacts not found" });
    }

    return res.status(200).json({ newContact });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = updateContactCTRL;
