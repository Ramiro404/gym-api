const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class EmployeeService {
  constructor() {}

  async create(data) {
    return await models.Employee.create(data);
  }

  async find() {
    return await models.Employee.findAll();
  }

  async findOne(id) {
    const employee = await models.Employee.findByPk(id, {
      include: ['user']
    });
    if (!employee) {
      throw boom.notFound('user not found');
    }
    return employee;
  }

  async update(id, changes) {
    const employee = await this.findOne(id);
    return await employee.update(changes);
  }

  async delete(id) {
    const employee = await this.findOne(id);
    await employee.destroy();
    return { id };
  }
}

module.exports = EmployeeService;
