const express = require("express");
const ClientService = require("../services/client.service");
const router = express.Router();
const service = new ClientService();
const { getIdSchema } = require("./../schemas/general.schema");
const validatorHandler = require("./../middlewares/validator.handler");
const {
  addPayment,
  createClientSchema,
  updateClientSchema
} = require("./../schemas/client.schema");

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



router.get(
  "/branch-office/:id",
  validatorHandler(getIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { limit, offset, order, active } = req.query;
      const { id } = req.params;
      res.json(await service.findByBranchOffice(id, {limit , offset, order, active }));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/membership/:id",
  validatorHandler(getIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findLastPaymentById(id));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/payment/:id",
  validatorHandler(getIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findAllPayment(id));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createClientSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-payment",
  validatorHandler(addPayment, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.addPayment(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getIdSchema, "params"),
  validatorHandler(updateClientSchema, "body"),
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
