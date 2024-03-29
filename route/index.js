const planRouter = require("./plan-routes.js");
const route = (app) => {
  app.use("/plans", planRouter);
  app.all("*", (req, res) => {
    res.status(404).json();
  });
};

module.exports = route;
