const { Bus } = require("../../models/bus");
const { City } = require("../../models/city");
const { Journey } = require("../../models/journey");
const { Rout } = require("../../models/rout");

const getJourneyService = async (skip, limit, rest) => {
  const { filter = "" } = rest;

  if (!filter) {
    const journey = await Journey.find({}, "", {
      skip,
      limit: limit,
    })
      .sort({ date: -1 })
      .populate({
        path: "bus",
        model: Bus,
      })
      .populate({
        path: "rout",
        model: Rout,
        populate: [
          {
            path: "from_place.city",
            model: City,
          },
          {
            path: "to_place.city",
            model: City,
          },
          {
            path: "stops.city",
            model: City,
          },
        ],
      });

    return journey;
  }

  const journey = await Journey.find(
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
      path: "bus",
      model: Bus,
    })
    .populate({
      path: "rout",
      model: Rout,
      populate: [
        {
          path: "from_place.city",
          model: City,
        },
        {
          path: "to_place.city",
          model: City,
        },
        {
          path: "stops.city",
          model: City,
        },
      ],
    });
  return journey;
};

const getActiveJourneyService = async (skip, limit, rest) => {
  const { filter = "" } = rest;

  if (!filter) {
    const journey = await Journey.find({ is_active: true }, "", {
      skip,
      limit: limit,
    })
      .sort({ date: -1 })
      .populate({
        path: "bus",
        model: Bus,
      })
      .populate({
        path: "rout",
        model: Rout,
        populate: [
          {
            path: "from_place.city",
            model: City,
          },
          {
            path: "to_place.city",
            model: City,
          },
          {
            path: "stops.city",
            model: City,
          },
        ],
      });

    return journey;
  }

  const journey = await Journey.find(
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
      path: "bus",
      model: Bus,
    })
    .populate({
      path: "rout",
      model: Rout,
      populate: [
        {
          path: "from_place.city",
          model: City,
        },
        {
          path: "to_place.city",
          model: City,
        },
        {
          path: "stops.city",
          model: City,
        },
      ],
    });
  return journey;
};

const getArchiveJourneyService = async (skip, limit, rest) => {
  const { filter = "" } = rest;

  if (!filter) {
    const journey = await Journey.find({ is_active: false }, "", {
      skip,
      limit: limit,
    })
      .sort({ date: -1 })
      .populate({
        path: "bus",
        model: Bus,
      })
      .populate({
        path: "rout",
        model: Rout,
        populate: [
          {
            path: "from_place.city",
            model: City,
          },
          {
            path: "to_place.city",
            model: City,
          },
          {
            path: "stops.city",
            model: City,
          },
        ],
      });

    return journey;
  }

  const journey = await Journey.find(
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
      path: "bus",
      model: Bus,
    })
    .populate({
      path: "rout",
      model: Rout,
      populate: [
        {
          path: "from_place.city",
          model: City,
        },
        {
          path: "to_place.city",
          model: City,
        },
        {
          path: "stops.city",
          model: City,
        },
      ],
    });
  return journey;
};

const getJourneyByIdService = async id =>
  await Journey.findById(id)
    .populate({
      path: "bus",
      model: Bus,
    })
    .populate({
      path: "rout",
      model: Rout,
      populate: [
        {
          path: "from_place.city",
          model: City,
        },
        {
          path: "to_place.city",
          model: City,
        },
        {
          path: "stops.city",
          model: City,
        },
      ],
    });

const updateJourneyStatusService = async (id, is_active) => {
  const updatedJourney = await Journey.findByIdAndUpdate(id, { is_active: is_active }, { new: true, runValidators: true })
    .populate({
      path: "bus",
      model: Bus,
    })
    .populate({
      path: "rout",
      model: Rout,
      populate: [
        {
          path: "from_place.city",
          model: City,
        },
        {
          path: "to_place.city",
          model: City,
        },
        {
          path: "stops.city",
          model: City,
        },
      ],
    });
  return updatedJourney;
};

const updateJourneyByIdService = async (id, newData) => {
  const updatedJourney = await Journey.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .populate({
      path: "bus",
      model: Bus,
    })
    .populate({
      path: "rout",
      model: Rout,
      populate: [
        {
          path: "from_place.city",
          model: City,
        },
        {
          path: "to_place.city",
          model: City,
        },
        {
          path: "stops.city",
          model: City,
        },
      ],
    });
  return updatedJourney;
};

const deleteJourneyByIdService = async cityId => {
  const remove = await Journey.findOneAndDelete({ _id: cityId }, {});
  return remove;
};

const createJourneyService = async (bus, rout, departure_date, arrival_date, is_active) => {
  const newJourney = new Journey({
    bus: bus,
    rout: rout,
    departure_date: departure_date,
    arrival_date: arrival_date,
    is_active: is_active,
    created_at: new Date().toISOString(),
  });

  await newJourney.save();
  return newJourney;
};

module.exports = {
  getJourneyService,
  getJourneyByIdService,
  updateJourneyByIdService,
  deleteJourneyByIdService,
  createJourneyService,
  getActiveJourneyService,
  getArchiveJourneyService,
  updateJourneyStatusService,
};
