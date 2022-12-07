const express = require("express");

const UserService = require("./../services/user.service");
const router = express.Router();
const service = new UserService();
const { getIdSchema } = require("./../schemas/general.schema");
const validatorHandler = require("./../middlewares/validator.handler");

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
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
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  validatorHandler(getIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
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
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;