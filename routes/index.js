const userRoutes = require("./usersRoute.js");

const routes = (app) => {
  app.use("/users", userRoutes);
};

module.exports = routes;
