const { Bus } = require("../../models/bus");
const { Journey } = require("../../models/journey");
const { Rout } = require("../../models/rout");
const { Ticket } = require("../../models/ticket");
const { User } = require("../../models/user");
const { City } = require("../../models/city");

const getUserService = async (skip, perPage, status, rest) => {
  const { filter = "" } = rest;

  if (!filter && !status) {
    const users = await User.find({}, "", {
      skip,
      limit: perPage,
    })
      .sort({ date: -1 })
      .populate({
        path: "ticket",
        model: Ticket,
        populate: [
          {
            path: "journey",
            model: Journey,
            populate: [
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
              {
                path: "bus",
                model: Bus,
              },
            ],
          },
        ],
      });

    return users;
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

  const users = await User.find(filterConditions)
    .sort({ createdAt: -1 })
    .populate({
      path: "ticket",
      model: Ticket,
      populate: [
        {
          path: "journey",
          model: Journey,
          populate: [
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
            {
              path: "bus",
              model: Bus,
            },
          ],
        },
      ],
    });
  return users;
};

const addTicketToUser = async (userId, ticketId) => {
  return await User.findByIdAndUpdate(userId, { $push: { ticket: ticketId } }, { new: true });
};

const getUserByIdService = async id => {
  return await User.findById(id).populate({
    path: "ticket",
    model: Ticket,
    populate: [
      {
        path: "journey",
        model: Journey,
        populate: [
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
          {
            path: "bus",
            model: Bus,
          },
        ],
      },
    ],
  });
};

const updateUserByIdService = async (id, newData) => {
  const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true, runValidators: true }).populate({
    path: "ticket",
    model: Ticket,
    populate: [
      {
        path: "journey",
        model: Journey,
        populate: [
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
          {
            path: "bus",
            model: Bus,
          },
        ],
      },
    ],
  });
  return updatedUser;
};

const deleteUserByIdService = async id => {
  const remove = await User.findOneAndDelete({ _id: id }, {});
  return remove;
};

module.exports = {
  getUserService,
  addTicketToUser,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
};
