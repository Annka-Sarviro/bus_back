const { createContactService } = require("../../services/contact/contactService");
const createError = require("http-errors");

const createContactCTRL = async (req, res) => {
  const data = req.body;

  try {
    const newData = { ...data };
    const newContact = await createContactService(newData);

    return res.status(201).json({ newContact });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = createContactCTRL;
