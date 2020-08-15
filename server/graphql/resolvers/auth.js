const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    try {
      const {
        userInput: { email, password },
      } = args;
      console.log("hit", args);
      const userExists = await User.findOne({ email });
      if (userExists) throw new Error("User Already Exists");
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new User({ email, password: hashedPassword });
      const result = await user.save();
      const { _doc } = result;
      const { createdAt, updatedAt } = _doc;
      return {
        ..._doc,
        createdAt: new Date(createdAt).toISOString,
        updatedAt: new Date(updatedAt).toISOString,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) throw new Error("User does not exist!");
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) throw new Error("Password is incorrect!");
      const token = jwt.sign(
        { userId: user.id, email: email },
        process.env.AUTH_PRIVATE_KEY,
        { expiresIn: "24h" }
      );
      return { userId: user.id, authToken: token, tokenExpiration: 1 };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
