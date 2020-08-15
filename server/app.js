const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
require("dotenv").config();
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
require("./config/mongoose");
const isAuth = require("./middlewares/auth");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    formatError: (err) => {
      console.log(err);
      return {
        message: err.message,
        code: 500, // <--
        // locations: err.locations,
        // path: err.path
      };
    },
  })
);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
