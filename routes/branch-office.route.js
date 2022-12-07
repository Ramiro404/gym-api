const express = require("express");
const BranchOfficeService = require("../services/branch-offices.service");
const router = express.Router();
const service = new BranchOfficeService();
const {
  createBranchOfficeSchema,
  updateBranchOfficeSchema
} = require("./../schemas/branch-office.schema");
const validatorHandler = require("./../middlewares/validator.handler");
const { getIdSchema } = require("./../schemas/general.schema");

router.get(
  "/",

  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
  }
);

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
  validatorHandler(createBranchOfficeSchema, "body"),
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
  validatorHandler(updateBranchOfficeSchema, "body"),
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
