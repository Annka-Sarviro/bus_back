const { City } = require("../../models/city");
const { Rout } = require("../../models/rout");

const getRoutService = async (skip, limit, rest) => {
  const { filter = "" } = rest;

  if (!filter) {
    const rout = await Rout.find({}, "", {
      skip,
      limit: limit,
    })
      .sort({ date: -1 })
      .populate({
        path: "from_place.city",
        model: City,
      })
      .populate({
        path: "to_place.city",
        model: City,
      })
      .populate({
        path: "stops",

        populate: { path: "city", model: City },
      });
    return rout;
  }

  const rout = await Rout.find(
    {
      $and: [
        {
          $or: [{ title: { $regex: filter, $options: "i" } }, { address: { $regex: filter, $options: "i" } }],
        },
      ],
    },
    {},
    { skip, limit }
  )
    .sort({ createdAt: -1 })
    .populate({
      path: "from_place.city",
      model: City,
    })
    .populate({
      path: "to_place.city",
      model: City,
    })
    .populate({
      path: "stops",

      populate: { path: "city", model: City },
    });
  return rout;
};

const getPopularRoutService = async (skip, limit, rest) => {
  const { filter = "" } = rest;

  const query = {
    is_popular: true,
  };

  if (filter) {
    query.$and = [
      {
        $or: [{ title: { $regex: filter, $options: "i" } }, { address: { $regex: filter, $options: "i" } }],
      },
    ];
  }

  const rout = await Rout.find(query, "", {
    skip,
    limit,
  })
    .sort({ date: -1 })
    .populate({
      path: "from_place.city",
      model: City,
    })
    .populate({
      path: "to_place.city",
      model: City,
    })
    .populate({
      path: "stops",
      populate: { path: "city", model: City },
    });

  return rout;
};

const getRoutByIdService = async id =>
  await Rout.findById(id)
    .populate({
      path: "from_place.city",
      model: City,
    })
    .populate({
      path: "to_place.city",
      model: City,
    })
    .populate({
      path: "stops",

      populate: { path: "city", model: City },
    });

const updateRoutPopularService = async (id, is_popular) => {
  const updatedRout = await Rout.findByIdAndUpdate(id, { is_popular: is_popular }, { new: true, runValidators: true })
    .populate({
      path: "from_place.city",
      model: City,
    })
    .populate({
      path: "to_place.city",
      model: City,
    })
    .populate({
      path: "stops",

      populate: { path: "city", model: City },
    });
  return updatedRout;
};

const updateRoutByIdService = async (id, newData) => {
  const updatedRout = await Rout.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .populate({
      path: "from_place.city",
      model: City,
    })
    .populate({
      path: "to_place.city",
      model: City,
    })
    .populate({
      path: "stops",

      populate: { path: "city", model: City },
    });
  return updatedRout;
};

const deleteRoutByIdService = async cityId => {
  const remove = await Rout.findOneAndDelete({ _id: cityId }, {});
  return remove;
};

const createRoutService = async (from_place, stops, to_place) => {
  const newRoute = new Rout({
    from_place: from_place,
    stops: stops,
    to_place: to_place,
  });

  await newRoute.save();
  return newRoute;
};

module.exports = {
  getRoutService,
  getRoutByIdService,
  updateRoutByIdService,
  deleteRoutByIdService,
  createRoutService,
  getPopularRoutService,
  updateRoutPopularService,
};
