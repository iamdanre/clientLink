const db = require("../models");
const Contact = db.contact;

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

exports.linkClient = (req, res) => {
  Contact.findByIdAndUpdate(req.params.contactId, { $push: { linkedClients: req.params.clientId } }, { new: true })
    .then(data => { res.status(200).send(data) })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while linking contact to client." });
    });
}
exports.unlinkClient = (req, res) => {
  res.status(200).send("Client Unlinked");
}