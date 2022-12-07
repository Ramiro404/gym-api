const { Model, DataTypes } = require("sequelize");
const { GYM_TABLE } = require("./gym.model");

const BRANCH_OFFICES_TABLE = "branch_offices";

const BranchOfficeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  gymId: {
    field: "gym_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GYM_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  }
};

class BranchOffice extends Model {
  static associate(models) {
    this.belongsTo(models.Gym, { as: "gym" });
    this.hasMany(models.Membership, {
      as: "memberships",
      foreignKey: "branchOfficeId"
    });
    this.hasMany(models.User, {
      as: "users",
      foreignKey: "branchOfficeId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BRANCH_OFFICES_TABLE,
      modelName: "BranchOffice",
      timestamps: false
    };
  }
}

module.exports = { BRANCH_OFFICES_TABLE, BranchOfficeSchema, BranchOffice };
