const Event = require("../../models/events");
const { transFormEvent } = require("../../config/transform");

const User = require("../../models/user");
module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          return transFormEvent(event);
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  createEvent: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Unauthenticated user!");
      const {
        eventInput: { title, description, price, date },
      } = args;
      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date),
        creator: req.userId,
      });
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("User Does not exist");
      }
      const result = await event.save();
      user.createdEvents.push(result);
      await user.save();
      return transFormEvent(result);
    } catch (error) {
      throw error;
    }
  },
};
