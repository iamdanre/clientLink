const mongoose = require("mongoose");

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    clientCode: {type: String, required: true, dropDups: true },
    name: {type: String, required: true},
    linkedContacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
  })
);

module.exports = Client;
