const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class BranchOfficeService {
  constructor() {}

  async create(data) {
    return await models.BranchOffice.create(data);
  }

  async find() {
    return await models.BranchOffice.findAll();
  }

  async findOne(id) {
    const user = await models.BranchOffice.findByPk(id, {
      include: ['clients']
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const branchOffice = await this.findOne(id);
    return await branchOffice.update(changes);
  }

  async delete(id) {
    const branchOffice = await this.findOne(id);
    await branchOffice.destroy();
    return { id };
  }
}

module.exports = BranchOfficeService;
