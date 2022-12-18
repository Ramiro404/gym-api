const { Model, DataTypes, Sequelize } = require("sequelize");
const { CLIENT_TABLE } = require("../models/client.model");
const { MEMBERSHIP_TABLE } = require("../models/membership.model");
const CLIENT_MEMBERSHIP_TABLE = "client_pays_membership";

const ClientMembershipSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  paymentDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "payment_date"
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  },
  clientId: {
    field: "client_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CLIENT_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  membershipId: {
    field: "membership_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MEMBERSHIP_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  }
};

class ClientMembership extends Model {
  // static associate(models) {
  //     this.belongsTo(models.BranchOffice, { as: 'branchOffice' });
  //     this.belongsTo(models.Employee, { as: 'employee' })
  // }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_MEMBERSHIP_TABLE,
      modelName: "ClientMembership",
      timestamps: false
    };
  }
}

module.exports = {
  CLIENT_MEMBERSHIP_TABLE,
  ClientMembershipSchema,
  ClientMembership
};
