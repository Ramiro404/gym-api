const { Model, DataTypes } = require("sequelize");

const EMPLOYEE_TABLE = "employees";

const EmployeeSchema = {
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
  hireDate: {
    field: "hire_date",
    allowNull: false,
    type: DataTypes.DATE
  }
};

class Employee extends Model {
  static associate(models) {
    this.hasOne(models.User, {
      as: "user",
      foreignKey: "employeeId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: "Employee",
      timestamps: false
    };
  }
}

module.exports = { EMPLOYEE_TABLE, EmployeeSchema, Employee };
