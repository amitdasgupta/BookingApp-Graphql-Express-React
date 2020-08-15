const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) throw new Error("Not authorized");
    const authToken = authHeader.split(" ")[1];
    if (!authToken) throw new Error("No have token");
    const decodedToken = jwt.verify(
      JSON.parse(authToken),
      process.env.AUTH_PRIVATE_KEY
    );
    if (decodedToken) {
      req.isAuth = true;
      req.userId = decodedToken.userId;
      next();
    }
  } catch (error) {
    req.isAuth = false;
    next();
  }
};
