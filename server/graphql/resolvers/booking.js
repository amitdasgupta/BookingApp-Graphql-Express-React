const Booking = require("../../models/booking");
const { userMerging } = require("../../config/merging");
const { transFormBooking } = require("../../config/transform");
module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transFormBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Unauthenticated user!");
      const { eventId } = args;
      const bookingExist = await Booking.find({
        user: req.userId,
        event: eventId,
      });
      if (bookingExist.length > 0)
        throw new Error("You already booked for event!");
      const bookingObj = new Booking({
        event: eventId,
        user: req.userId,
      });
      const booking = await bookingObj.save();
      return transFormBooking(booking);
    } catch (error) {
      console.log(`Error:${error}`);
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Unauthenticated user!");
      const { bookingId } = args;
      if (!(await Booking.exists({ _id: bookingId })))
        throw new Error("booking already deleted");
      const booking = await Booking.findById(bookingId)
        .populate("event")
        .lean();
      const { event } = booking;
      await Booking.findByIdAndDelete(bookingId);
      return { ...event, creator: userMerging.bind(this, event.creator) };
    } catch (error) {
      throw error;
    }
  },
  getBookedEvents: async (args, req) => {
    try {
      const { userId } = req;
      if (!userId) throw new Error("Unauthenticated user!");
      const allBookedEvents = await Booking.find({ user: userId });
      const allBooked = allBookedEvents.map((booked) => {
        return { _id: booked.event, bookingId: booked.id };
      });
      return allBooked;
    } catch (error) {
      throw error;
    }
  },
};
