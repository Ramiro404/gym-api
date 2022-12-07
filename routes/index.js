const express = require("express");
const gymRouter = require("./gym.route");
const branchOfficeRouter = require("./branch-office.route");
const clientRouter = require("./client.route");
const userRouter = require("./users.route");
const employeeRouter = require("./employee.route");
const membershipRouter = require("./membership.router");
const authRouter = require("./auth.router");

async function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/gyms", gymRouter);
  router.use("/branchoffices", branchOfficeRouter);
  router.use("/clients", clientRouter);
  router.use("/users", userRouter);
  router.use("/employees", employeeRouter);
  router.use("/memberships", membershipRouter);
}

module.exports = routerApi;
