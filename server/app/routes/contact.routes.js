//const { authJwt } = require("../middleware");
const controller = require("../controllers/contact.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/contacts/all", controller.allContacts);
  app.post("/api/contacts/add", controller.addContact);
  app.put("/api/contacts/linkClient", controller.linkClient);
  app.put("/api/contacts/unlinkClient", controller.unlinkClient);
};