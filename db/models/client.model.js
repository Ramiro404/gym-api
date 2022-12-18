const { Model, DataTypes, Sequelize } = require("sequelize");

const CLIENT_TABLE = "clients";

const ClientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birthdate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  },
};

class Client extends Model {
  static associate(models) {
    //this.belongsToMany(models.Membership, { through: models.ClientMembership})
    this.belongsToMany(models.Membership, {
      as: "acquittance",
      through: models.ClientMembership,
      foreignKey: "clientId",
      otherKey: "membershipId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: "Client",
      timestamps: false
    };
  }
}

module.exports = { CLIENT_TABLE, ClientSchema, Client };
