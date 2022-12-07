const { Gym, GymSchema } = require("./gym.model");
const { BranchOffice, BranchOfficeSchema } = require("./branch-offices.model");
const { Client, ClientSchema } = require("./client.model");
const { User, UserSchema } = require("./user.model");
const { Employee, EmployeeSchema } = require("./employee.model");
const { Membership, MembershipSchema } = require("./membership.model");
const {
  ClientMembership,
  ClientMembershipSchema
} = require("./client-membership.model");

function setupModels(sequelize) {
  Gym.init(GymSchema, Gym.config(sequelize));
  BranchOffice.init(BranchOfficeSchema, BranchOffice.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Membership.init(MembershipSchema, Membership.config(sequelize));
  ClientMembership.init(
    ClientMembershipSchema,
    ClientMembership.config(sequelize)
  );

  Gym.associate(sequelize.models);
  BranchOffice.associate(sequelize.models);
  Client.associate(sequelize.models);
  //Membership.associate(sequelize.models)
  Employee.associate(sequelize.models);
  User.associate(sequelize.models);
  // ClientMembership.init(CLIENT_MEMBERSHIP_TABLE, ClientMembership.config(sequelize))
}

module.exports = setupModels;
