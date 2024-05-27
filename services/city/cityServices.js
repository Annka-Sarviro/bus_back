const { City } = require("../../models/city");

const getCityService = async (skip, limit, rest) => {
  const { filter = "" } = rest;

  if (!filter) {
    const city = await City.find({}, "", {
      skip,
      limit: limit,
    }).sort({ date: -1 });
    return city;
  }

  const city = await City.find(
    {
      $and: [
        {
          $or: [{ title: { $regex: filter, $options: "i" } }, { address: { $regex: filter, $options: "i" } }],
        },
      ],
    },
    {},
    { skip, limit }
  ).sort({ createdAt: -1 });
  return city;
};

const getCityByIdService = async id => await City.findById(id);

const deleteCityByIdService = async cityId => {
  const remove = await City.findOneAndDelete({ _id: cityId }, {});
  return remove;
};

const createCityService = async newData => {
  const newCity = new City({ ...newData });
  const savedNotice = await newCity.save();
  return savedNotice;
};

module.exports = {
  getCityService,
  getCityByIdService,
  deleteCityByIdService,
  createCityService,
};
