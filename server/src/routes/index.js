const authRouter = require("./auth.route");
const calculateRouter = require("./calculate.route");
const constructionRouter = require("./construction.route");

const routers = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/calculate", calculateRouter);
  app.use("/api/v1/construction", constructionRouter);
};

module.exports = routers;
