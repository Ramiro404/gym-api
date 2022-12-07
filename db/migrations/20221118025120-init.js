"use strict";

const { GYM_TABLE } = require("../models/gym.model");
const { BRANCH_OFFICES_TABLE } = require("../models/branch-offices.model");
const { CLIENT_TABLE } = require("../models/client.model");
const { EMPLOYEE_TABLE } = require("../models/employee.model");
const { USER_TABLE } = require('../models/user.model');
const { MEMBERSHIP_TABLE } = require("../models/membership.model");
const { CLIENT_MEMBERSHIP_TABLE } = require("../models/client-membership.model");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(GYM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      }
    });
    await queryInterface.createTable(BRANCH_OFFICES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      gymId: {
        field: "gym_id",
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: GYM_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    });
    await queryInterface.createTable(CLIENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.createTable(EMPLOYEE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hireDate: {
        field: 'hire_date',
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      },
      branchOfficeId: {
        field: 'branch_office_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: BRANCH_OFFICES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      employeeId: {
        field: 'employee_id',
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: EMPLOYEE_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
    await queryInterface.createTable(MEMBERSHIP_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      price: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      branchOfficeId: {
        field: 'branch_office_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: BRANCH_OFFICES_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    });
    await queryInterface.createTable(CLIENT_MEMBERSHIP_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "payment_date"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "create_at",
        defaultValue: Sequelize.NOW
      },
      clientId: {
        field: "client_id",
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: CLIENT_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      membershipId: {
        field: "membership_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: MEMBERSHIP_TABLE,
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CLIENT_MEMBERSHIP_TABLE);
    await queryInterface.dropTable(MEMBERSHIP_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(EMPLOYEE_TABLE);
    await queryInterface.dropTable(CLIENT_TABLE);
    await queryInterface.dropTable(BRANCH_OFFICES_TABLE);
    await queryInterface.dropTable(GYM_TABLE);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
