const { createBusService } = require("../../services/bus/busServices");
const createError = require("http-errors");
const Jimp = require("jimp");
const fs = require("fs/promises");
const cloudinary = require("../../helpers/cloudinary");
const imgSizePx = 500;

const addBusCTRL = async (req, res) => {
  const data = req.body;

  const { path: tempUpload } = req.file;
  const jimpPhoto = await Jimp.read(tempUpload);
  await jimpPhoto.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

  try {
    const uploader = async path => await cloudinary.uploads(path, "bus_dir/bus_photo");
    const newPath = await uploader(tempUpload);
    fs.unlink(req.file.path);
    const newData = { ...data, photo: newPath.url };
    const newCity = await createBusService(newData);

    return res.status(201).json({ newCity });
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = addBusCTRL;
