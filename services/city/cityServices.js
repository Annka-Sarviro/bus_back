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

const updateCityByIdService = async (id, newData) => {
  const updatedCity = await City.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
  return updatedCity;
};

const deleteCityByIdService = async cityId => {
  const remove = await City.findOneAndDelete({ _id: cityId }, {});
  return remove;
};

const createCityService = async newData => {
  const newCity = new City({ ...newData });
  const savedCity = await newCity.save();
  return savedCity;
};

module.exports = {
  getCityService,
  getCityByIdService,
  updateCityByIdService,
  deleteCityByIdService,
  createCityService,
};
