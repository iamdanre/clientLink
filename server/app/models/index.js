const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.client = require("./client.model");
db.contact = require("./contact.model");

module.exports = db;