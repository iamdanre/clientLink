const db = require("../models");
const Contact = db.contact;
const Client = db.client;

// get all clients from database
exports.allContacts = (req, res) => {
  Contact.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving Contacts."
      });
    });
};

// add client to database
exports.addContact = (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  });
  contact.save().then(data => {
    res.status(200).send(data);
    console.log("Contact added successfully!");
  }).catch(err => {
    if (err.name === 'MongoError' && err.code === 11000) {
      // duplicate email
      return res.status(500).send({ message: "Contact email already exists!" });
    }
    res.status(500).send({
      message:
        err.message || "An error occurred while adding Contact."
    });
  });
}

// link client to contact
exports.linkClient = (req, res) => {
  Contact.findByIdAndUpdate(req.body.contactId, { $push: { linkedClients: req.body.clientId } }, { new: true })
    .then(data => { res.status(200).send(data) })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while linking contact to client." });
    });
  // also link contact to client
  Client.findByIdAndUpdate(req.body.clientId, { $push: { linkedContacts: req.body.contactId } }, { new: true })
    .then(data => { console.log("Client linked successfully!") })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while linking client to contact." });
    }
    );
}

// unlink client from contact
exports.unlinkClient = (req, res) => {
  // get client and contact from request body and unlink them
  Contact.findByIdAndUpdate(req.body.contactId, { $pull: { linkedClients: req.body.clientId } }, { new: true })
    .then(data => { res.status(200).send(data) })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while unlinking contact from client." });
    }
    );
  // also unlink contact from client
  Client.findByIdAndUpdate(req.body.clientId, { $pull: { linkedContacts: req.body.contactId } }, { new: true })
    .then(data => { console.log("Client unlinked successfully!") })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while unlinking client from contact." });
    }
    );
}