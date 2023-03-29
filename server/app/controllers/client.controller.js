const db = require("../models");
const Client = db.client;

// get all clients from database
exports.allClients = (req, res) => {
  Client.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving Clients."
      });
    });
};

// add client to database
exports.addClient = (req, res) => {
  const clientName = req.body.name;
  /* populate array with clientCode values from database...
   Note: this method is not reliable or scalable as the values are fetched from the database in a single request then iterated over in memory,
   which may lead to duplicate client codes if the database is updated while the request is being processed. However,
   if the database is hosted on a cloud service (as this one is) or on another server, the application will degrade in performance as a request 
   is made to the database for each iteration of the loop which causes large overhead as  26*26*26*10*10*10 = 1 757 600 client codes are possible.
   For the purpose of this exercise, it's done in memory. */
  const clientCodes = [];
  Client.find({ clientCode: { $exists: true } }, { clientCode: 1 })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        clientCodes.push(data[i].clientCode);
      }
      const code = generateClientCode(clientName, clientCodes);

      const client = new Client({
        name: clientName,
        clientCode: code
      });
      client.save().then(data => {
        res.status(200).send(data);
        console.log("Client added successfully!");
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while adding Client."
      });
    });
}

exports.linkContact = (req, res) => {
  // get client and contact from request body and link them
  Client.findByIdAndUpdate(req.body.clientId, { $push: { linkedContacts: req.body.contactId } }, { new: true })
    .then(data => { res.status(200).send(data) })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while linking contact to client." }); 
    });
}

// unlink contact from client
exports.unlinkContact = (req, res) => {
  // get client and contact from request body and unlink them
  Client.findByIdAndUpdate(req.body.clientId, { $pull: { linkedContacts: req.body.contactId } }, { new: true })
    .then(data => { res.status(200).send(data) })
    .catch(err => {
      res.status(500).send({ message: err.message || "An error occurred while unlinking contact from client." });
    });
}

// Helper function that generates a unique client code for the given client name
function generateClientCode(clientName, existingCodes = []) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let codePrefix;
  if (clientName.split(" ").length >= 3) {
    // Use initials if there are 3 or more words
    const initials = clientName.match(/\b\w/g).join("").toUpperCase();
    codePrefix = initials.slice(0, 3);
  } else if (clientName.length < 3) {
    // Fill up with letters if the name is less than 3 characters padding with A's then B's etc.
    codePrefix = clientName.toUpperCase();
    for (let i = 0; i < 3 - clientName.length; i++) {
      codePrefix += alphabet[i];
    }
  } else {
    codePrefix = clientName.slice(0, 3).toUpperCase();
  }
  // Generate all possible codes for the given client name
  const possibleCodes = Array.from({ length: 999 }, (_, i) => `${codePrefix}${(i + 1).toString().padStart(3, "0")}`);
  // Filter out any codes that already exist
  const availableCodes = possibleCodes.filter(code => !existingCodes.includes(code));
  // Return the first available code
  if (availableCodes.length > 0) {
    return availableCodes[0];
  } else {
    throw new Error("No available client codes.");
  }
}