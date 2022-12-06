"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        login: "Phelipe",
        password: "123",
        firstName: "Phelipe",
        lastName: "Curty",
        email: "example@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: "Lucas",
        password: "3535345345",
        firstName: "Lucas",
        lastName: "Amorim",
        email: "asd@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
