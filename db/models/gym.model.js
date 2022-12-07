const { Model, DataTypes } = require("sequelize");

const GYM_TABLE = "gyms";

const GymSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.TEXT,
  }
};

class Gym extends Model {
  static associate(models) {
    this.hasMany(models.BranchOffice, {
      as: "branch_offices",
      foreignKey: "gymId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GYM_TABLE,
      modelName: "Gym",
      timestamps: false
    };
  }
}

module.exports = { GYM_TABLE, GymSchema, Gym };
