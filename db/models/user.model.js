const { Model, DataTypes, Sequelize } = require("sequelize");
const { BRANCH_OFFICES_TABLE } = require("./branch-offices.model");
const { EMPLOYEE_TABLE } = require("./employee.model");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
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
  },
  employeeId: {
    field: "employee_id",
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: EMPLOYEE_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL"
  }
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.BranchOffice, { as: "branchOffice" });
    this.belongsTo(models.Employee, { as: "employee" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
