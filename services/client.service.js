const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const sequelize = require('./../libs/sequelize');
class ClientService {
  constructor() { }

  async create(data) {
    const { name, lastname, birthdate, branchOfficeId, paymentDate, membershipId} = data;
    const client = await models.Client.create({name,lastname, birthdate});
    const acquittance = await models.ClientMembership.create({branchOfficeId, membershipId, paymentDate, clientId: client.id});
    return { client, acquittance };
  }

  async find() {
    return await models.Client.findAll();
  }

  async findByBranchOffice(id) {
    // eslint-disable-next-line no-unused-vars
    const [results, metadata] = await sequelize.query(`
    SELECT Clients.id, Clients.name, Clients.lastname, Clients.birthdate, Clients.create_at,
    TO_CHAR(MAX(CLIENT_PAYS_MEMBERSHIP.payment_date)::date, 'dd/mm/yyyy') as last_payment
    FROM Clients
    INNER JOIN CLIENT_PAYS_MEMBERSHIP ON Clients.id=CLIENT_PAYS_MEMBERSHIP.client_id
    INNER JOIN MEMBERSHIPS ON MEMBERSHIPS.branch_office_id=${id}
    GROUP BY Clients.id;
    `);
    return results;
  }

  async addPayment(data) {
    return await models.ClientMembership.create(data)
  }
  async findOne(id) {
    const user = await models.Client.findByPk(id, {
      include: ['acquittance']
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findLastPaymentById(id) {
    // eslint-disable-next-line no-unused-vars
    const [results, metadata] = await sequelize.query(`
      SELECT id, payment_date, create_at, client_id, membership_id, max(create_at) as last_payment
      FROM Client_Pays_Membership
      WHERE Client_Pays_Membership.client_id=${id}
      GROUP BY id
      LIMIT 1;
    `);
    return results;
  }

  async findAllPayment(id) {
    // eslint-disable-next-line no-unused-vars
    const [results, metadata] = await sequelize.query(`
    SELECT
    c.id, c.name, c.lastname,
    cm.id as code, cm.payment_date, cm.create_at, m.name as membership, m.description,
    m.price
    FROM Clients as c
    INNER JOIN Client_Pays_Membership as cm
    ON c.id=cm.client_id
    INNER JOIN Memberships as m
    ON cm.membership_id=m.id
    WHERE cm.client_id=${id}
    `);
    return results;
  }

  async update(id, changes) {
    const client = await this.findOne(id);
    return await client.update(changes);
  }

  async delete(id) {
    const client = await this.findOne(id);
    await client.destroy();
    return { id };
  }
}

module.exports = ClientService;
