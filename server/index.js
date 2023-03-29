const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
// this enables CORS for dev and production environments
var corsOptions = {
  origin: "http://localhost:5173"
};
app.use(cors(corsOptions));
// use body-parser to parse requests of content-type - application/json
app.use(bodyParser.json());
// use body-parser to parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Client = db.client;
const Contact = db.contact;

// connect to MongoDB
db.mongoose
  .connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@cluster0.nwkkw.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to clientLink API server");
});

// routes
require("./app/routes/client.routes")(app);
require("./app/routes/contact.routes")(app);

// setting port to listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`clientLink API server running on port ${PORT}.`);
});