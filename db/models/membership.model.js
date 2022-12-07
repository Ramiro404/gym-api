const { Model, DataTypes } = require("sequelize");
const { BRANCH_OFFICES_TABLE } = require("./branch-offices.model");

const MEMBERSHIP_TABLE = "memberships";

const MembershipSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: true,
    type: DataTypes.DECIMAL
  },
  branchOfficeId: {
    field: "branch_office_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: BRANCH_OFFICES_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  }
};

class Membership extends Model {
  //static associate(models) {
  // this.belongsToMany(models.Client, {
  //  through: models.ClientMembership,
  //  as: 'clients',
  //foreignKey: 'membershipId',
  //otherKey: 'clientId' });
  //}
  static associate(models) {
    this.belongsTo(models.BranchOffice, { as: "branchOffice" });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MEMBERSHIP_TABLE,
      modelName: "Membership",
      timestamps: false
    };
  }
}

module.exports = { MEMBERSHIP_TABLE, MembershipSchema, Membership };
