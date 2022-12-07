
class CrudRouter {
  constructor(service) {
    return Promise.resolve(service)
      .then(service => {
        this.entityService = service;
      });
  }

  async find(req, res, next) {
    try {
      const data = await this.entityService.find();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await this.entityService.findOne(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const body = req.body;
      const data = await this.entityService.create(body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      const data = await this.entityService.update(id, body);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.entityService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }

}

module.exports = { CrudRouter}
