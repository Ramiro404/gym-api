const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class MembershipService {
  constructor() {}

  async create(data) {
    return await models.Membership.create(data);
  }

  async find() {
    return await models.Membership.findAll();
  }

  async findByBranchOffice(id) {
    return await models.Membership.findAll({
      where: {
        branchOfficeId: id
      }
    });
  }

  async findOne(id) {
    const membership = await models.Membership.findByPk(id);
    if (!membership) {
      throw boom.notFound('user not found');
    }
    return membership;
  }

  async update(id, changes) {
    const membership = await this.findOne(id);
    return await membership.update(changes);
  }

  async delete(id) {
    const membership = await this.findOne(id);
    await membership.destroy();
    return { id };
  }
}

module.exports = MembershipService;
