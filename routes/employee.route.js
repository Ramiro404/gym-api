const express = require("express");
const EmployeeService = require("../services/employee.service");
const router = express.Router();
const service = new EmployeeService();
const { getIdSchema } = require("./../schemas/general.schema");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  createEmployeeSchema,
  updateEmployeeSchema
} = require("./../schemas/employee.schema");

router.get("/", async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createEmployeeSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getIdSchema, "params"),
  validatorHandler(updateEmployeeSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
