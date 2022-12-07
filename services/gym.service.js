const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class GymService {
  constructor() {}

  async create(data) {
    return await models.Gym.create(data);
  }

  async find() {
    return await models.Gym.findAll();
  }

  async findOne(id) {
    const user = await models.Gym.findByPk(id, {
      include: ['branch_offices']
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const gym = await this.findOne(id);
    return await gym.update(changes);
  }

  async delete(id) {
    const gym = await this.findOne(id);
    await gym.destroy();
    return { id };
  }
}

module.exports = GymService;
