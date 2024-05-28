const { Bus } = require("../../models/bus");

const getBusService = async (skip, limit, rest) => {
  const { filter = "" } = rest;

  if (!filter) {
    const bus = await Bus.find({}, "", {
      skip,
      limit: limit,
    })
      .sort({ date: -1 })
      .select("name photo busIdService plates_number first_floor_seats_count second_floor_seats_count is_wc_working");
    return bus;
  }

  const bus = await Bus.find(
    {
      $and: [
        {
          $or: [{ name: { $regex: filter, $options: "i" } }, { plates_number: { $regex: filter, $options: "i" } }],
        },
      ],
    },
    {},
    { skip, limit }
  ).sort({ createdAt: -1 });
  return bus;
};

const getBusByIdService = async id => await Bus.findById(id);

const updateBusByIdService = async (id, newData) => {
  const updatedCity = await Bus.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
  return updatedCity;
};

const deleteBusByIdService = async cityId => {
  const remove = await Bus.findOneAndDelete({ _id: cityId }, {});
  return remove;
};

const createBusService = async newData => {
  const newBus = new Bus({ ...newData });
  const savedBus = await newBus.save();
  return savedBus;
};

module.exports = {
  getBusService,
  getBusByIdService,
  updateBusByIdService,
  deleteBusByIdService,
  createBusService,
};
