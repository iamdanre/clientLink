const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: {type: String , required: true},
    surname: {type: String , required: true},
    email: {type: String , required: true, unique: true, dropDups: true},
    linkedClients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  })
);

module.exports = Contact;
