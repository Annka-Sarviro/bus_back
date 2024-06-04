const { Contact } = require("../../models/contact");

const getContactService = async () => {
  const contact = await Contact.find({}, "", {}).sort({ date: -1 });
  return contact;
};

const getSocialsService = async () => {
  const contact = await Contact.find({}, "", {}).sort({ date: -1 }).select("contacts");
  return contact;
};

const createContactService = async newData => {
  const newContact = new Contact({ ...newData });
  const savedContact = await newContact.save();
  return savedContact;
};

const updateContactService = async newData => {
  const updatedContact = await Contact.findOneAndUpdate({}, newData, { new: true, runValidators: true });
  return updatedContact;
};

module.exports = {
  createContactService,
  getContactService,
  getSocialsService,
  updateContactService,
};
