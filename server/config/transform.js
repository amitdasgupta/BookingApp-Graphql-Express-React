const { userMerging, singleEventMerging } = require("../config/merging");
const transFormEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    creator: userMerging.bind(this, event.creator),
    date: new Date(event.date).toISOString(),
  };
};

const transFormBooking = (booking) => {
  const { _doc } = booking;
  const { createdAt, updatedAt } = _doc;
  return {
    ..._doc,
    createdAt: new Date(createdAt).toISOString(),
    updatedAt: new Date(updatedAt).toISOString(),
    _id: booking.id,
    event: singleEventMerging.bind(this, booking.event),
    user: userMerging.bind(this, booking.user),
  };
};

module.exports = {
  transFormEvent,
  transFormBooking,
};
