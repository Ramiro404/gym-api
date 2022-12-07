const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ClientMembershipService {
  constructor() {}

  async create(data) {
    return await models.ClientMembership.create(data);
  }

  async find() {
    return await models.ClientMembership.findAll();
  }

  async findOne(id) {
    const clientMembership = await models.ClientMembership.findByPk(id);
    if (!clientMembership) {
      throw boom.notFound('user not found');
    }
    return clientMembership;
  }

  async update(id, changes) {
    const clientMembership = await this.findOne(id);
    return await clientMembership.update(changes);
  }

  async delete(id) {
    const clientMembership = await this.findOne(id);
    await clientMembership.destroy();
    return { id };
  }
}

module.exports = ClientMembershipService;
