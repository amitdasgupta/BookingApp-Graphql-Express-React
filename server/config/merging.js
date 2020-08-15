const Event = require("../models/events");
const User = require("../models/user");
const userMerging = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: eventMerging.bind(this, user.createdEvents),
      password: null,
    };
  } catch (error) {
    throw error;
  }
};

const eventMerging = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: userMerging.bind(this, event.creator),
        date: new Date(event.date).toISOString(),
      };
    });
  } catch (error) {
    throw error;
  }
};

const singleEventMerging = async (eventId) => {
  const event = await Event.findById(eventId);
  return {
    ...event._doc,
    _id: event.id,
    creator: userMerging.bind(this, event.creator),
  };
};

module.exports = {
  userMerging,
  eventMerging,
  singleEventMerging,
};
