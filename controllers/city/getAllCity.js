const { City } = require("../../models/city");

const getAllCity = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const city = await City.find({}, "", {
    skip,
    limit: limit,
  }).sort({ date: -1 });

  res.json({
    message: "success",
    data: { result: city },
  });
};

module.exports = getAllCity;
