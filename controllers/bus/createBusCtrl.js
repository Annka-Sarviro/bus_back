const { createBusService } = require("../../services/bus/busServices");
const createError = require("http-errors");
const Jimp = require("jimp");
const fs = require("fs/promises");
const cloudinary = require("../../helpers/cloudinary");
const imgSizePx = 500;

const addBusCTRL = async (req, res) => {
  const data = req.body;
  let newPath = null;

  if (req.file) {
    const { path: tempUpload } = req.file;
    const jimpPhoto = await Jimp.read(tempUpload);
    await jimpPhoto.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

    try {
      const uploader = async path => await cloudinary.uploads(path, "page_dir/banner");
      newPath = await uploader(tempUpload);
      fs.unlink(req.file.path, err => {
        if (err) {
          console.error("Failed to delete temporary file:", err);
        }
      });
    } catch (error) {
      throw createError(400, error.message);
    }
  }

  try {
    const newData = newPath ? { ...data, photo: newPath } : data;
    const newBus = await createBusService(newData);

    return res.status(201).json({ newBus });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addBusCTRL;
