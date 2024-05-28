const fs = require("fs/promises");
// const path = require("path");  // need for avatarDir
const createError = require("http-errors");
const Jimp = require("jimp");
const cloudinary = require("../../helpers/cloudinary");

const { Bus } = require("../../models/bus");

// const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const imgSizePx = 500;

const updateBusImageListByIdCTRL = async (req, res) => {
  try {
    const { _id } = req.user;
    const files = req.files;

    if (!files || files.length === 0) {
      throw createError(400, "No files uploaded");
    }
    const imagePaths = [];

    for (const file of files) {
      const { path: tempUpload } = file;

      const jimpAvatar = await Jimp.read(tempUpload);
      await jimpAvatar.resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER).writeAsync(tempUpload);

      const uploader = async path => await cloudinary.uploads(path, "bus/image_list");
      const newPath = await uploader(tempUpload);
      await fs.unlink(tempUpload);

      imagePaths.push(newPath.url);
    }

    const updatedBus = await Bus.findByIdAndUpdate(_id, { image_list: imagePaths }, { new: true });

    if (!updatedBus) {
      throw createError(404, "Bus not found");
    }

    res.json({ message: "success", image_list: updatedBus.image_list });
  } catch (error) {
    if (req.files) {
      for (const file of req.files) {
        await fs.unlink(file.path);
      }
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateBusImageListByIdCTRL;
