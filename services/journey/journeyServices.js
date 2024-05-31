const { Bus } = require("../../models/bus");
const { City } = require("../../models/city");
const { Journey } = require("../../models/journey");
const { Rout } = require("../../models/rout");
const { Ticket } = require("../../models/ticket");

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

const updateJourneySeatsService = async (id, seat_number, new_status) => {
  const journey = await Journey.findById(id);

  let seat = journey.seats.first_flour_seats.find(seat => seat.seat_number === seat_number);

  if (!seat) {
    seat = journey.seats.second_flour_seats.find(seat => seat.seat_number === parseInt(seat_number));
  }
  if (!seat) {
    return [];
  }

  seat.status = new_status;
  const ticket = await Ticket.findById(seat.tickets_id);
  if (!ticket) {
    return { message: "Ticket not found" };
  }
  ticket.status = new_status;
  await journey.save();
  await ticket.save();
  const new_Journey = await Journey.findById(id);
  return new_Journey;
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

const deleteJourneyByIdService = async journeyId => {
  const remove = await Journey.findOneAndDelete({ _id: journeyId }, {});
  return remove;
};

const createJourneyService = async (bus, rout, departure_date, arrival_date, is_active, createdFirstFloorTickets, createdSecondFloorTickets) => {
  const newJourney = new Journey({
    bus: bus,
    rout: rout,
    departure_date: departure_date,
    arrival_date: arrival_date,
    is_active: is_active,
    created_at: new Date().toISOString(),
  });

  newJourney.seats.first_flour_seats = createdFirstFloorTickets.map(ticket => ({
    seat_number: ticket.seat_number,
    tickets_id: ticket._id,
  }));
  newJourney.seats.second_flour_seats = createdSecondFloorTickets.map(ticket => ({
    seat_number: ticket.seat_number,
    tickets_id: ticket._id,
  }));

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
  updateJourneySeatsService,
};