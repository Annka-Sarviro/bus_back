const { ticket } = require("../../controllers");
const { Bus } = require("../../models/bus");
const { City } = require("../../models/city");
const { Journey } = require("../../models/journey");
const { Rout } = require("../../models/rout");
const { Ticket } = require("../../models/ticket");

const getTicketByIdService = async id =>
  await Ticket.findById(id).populate({
    path: "journey",
    model: Journey,
    populate: [
      {
        path: "bus",
        model: Bus,
      },
      {
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
      },
    ],
  });

const getTicketsService = async (skip, perPage, status, rest) => {
  const { filter = "" } = rest;

  if (!filter && !status) {
    const tickets = await Ticket.find({}, "", {
      skip,
      limit: perPage,
    })
      .sort({ date: -1 })
      .populate({
        path: "journey",
        model: Journey,
        populate: [
          {
            path: "bus",
            model: Bus,
          },
          {
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
          },
        ],
      });

    return tickets;
  }

  const filterConditions = {
    $and: [
      {
        $or: [{ title: { $regex: filter, $options: "i" } }, { address: { $regex: filter, $options: "i" } }],
      },
    ],
  };

  if (status) {
    filterConditions.$and.push({ status });
  }

  const tickets = await Ticket.find(filterConditions)
    .sort({ createdAt: -1 })
    .populate({
      path: "journey",
      model: Journey,
      populate: [
        {
          path: "bus",
          model: Bus,
        },
        {
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
        },
      ],
    });
  return tickets;
};

const createTicketService = async (seat_number, journey_data, status, price, order_id, user_id) => {
  const newTicket = new Ticket({
    seat_number: seat_number,
    status: status,
    journey: journey_data,
    price: price,
    order_id: order_id,
    ordered_data: new Date().toISOString(),
    user_id: user_id,
  });

  await newTicket.save();

  if (status !== "new") {
    const journey = await Journey.findById(journey_data);

    if (!journey) {
      throw new Error("Journey not found");
    }

    journey.seats.first_flour_seats.forEach(seat => {
      if (seat.seat_number === seat_number) {
        seat.status = status;
      }
    });

    journey.seats.second_flour_seats.forEach(seat => {
      if (seat.seat_number === seat_number) {
        seat.status = status;
      }
    });

    await journey.save();
  }

  return newTicket;
};

const deleteTicketByIdService = async cityId => {
  const remove = await Ticket.findOneAndDelete({ _id: cityId }, {});
  return remove;
};

const updateTicketByIdService = async (id, newData) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(id, newData, { new: true, runValidators: true }).populate({
    path: "journey",
    model: Journey,
    populate: [
      {
        path: "bus",
        model: Bus,
      },
      {
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
      },
    ],
  });
  return updatedTicket;
};

const updateTicketStatusService = async (id, status) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(id, { status: status }, { new: true, runValidators: true }).populate({
    path: "journey",
    model: Journey,
    populate: [
      {
        path: "bus",
        model: Bus,
      },
      {
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
      },
    ],
  });

  const journey = await Journey.findOne({
    $or: [{ "seats.first_flour_seats.tickets_id": id }, { "seats.second_flour_seats.tickets_id": id }],
  });

  if (!journey) {
    throw new Error("Journey not found");
  }

  journey.seats.first_flour_seats.forEach(seat => {
    if (seat.tickets_id.toString() === id) {
      seat.status = status;
    }
  });

  journey.seats.second_flour_seats.forEach(seat => {
    if (seat.tickets_id.toString() === ticket) {
      seat.status = status;
    }
  });

  await journey.save();
  // 15 хвилинне блокування квитка для оплати
  if (status === "blocked") {
    setTimeout(async () => {
      const ticket = await Ticket.findById(id);
      if (ticket && ticket.status === "blocked") {
        ticket.status = "new";
        await ticket.save();

        const journey = await Journey.findById(ticket.journey);

        if (journey) {
          journey.seats.first_flour_seats.forEach(seat => {
            if (seat.tickets_id.toString() === id) {
              seat.status = "new";
            }
          });

          journey.seats.second_flour_seats.forEach(seat => {
            if (seat.tickets_id.toString() === id) {
              seat.status = "new";
            }
          });

          await journey.save();
        }
      }
    }, 15 * 60 * 1000);
  }

  return updatedTicket;
};

module.exports = {
  getTicketsService,
  getTicketByIdService,
  updateTicketByIdService,
  deleteTicketByIdService,
  createTicketService,
  updateTicketStatusService,
};
