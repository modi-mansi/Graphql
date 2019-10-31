// Express JS
const express = require("express");

// Graphql for Express js
const graphqlHTTP = require("express-graphql");

// Graphql Main schema
const schema = require("./schema");

// Mongo DB connection
const mongoose = require("mongoose");

// for data changes
const _ = require("lodash");

// Cors
const cors = require("cors");

// Creating instance of app js
const app = express();

// Config variables
const config = require("./config/config.json");
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || "development";

const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

// Global config
global.gConfig = finalConfig;

// Connecting with database
mongoose
  .connect(global.gConfig.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info(
      `DB connected Successfully`
    );
  })
  .catch(() => {
    console.error("DB connection failed");
  });

// Setting cors middleware
app.use(cors());

// Creating graphql schema
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: global.gConfig.graphqli
  })
);

// Running Express JS
app.listen(global.gConfig.node_port, () => {
  console.log(`Listening on port ${global.gConfig.node_port}`);
});
