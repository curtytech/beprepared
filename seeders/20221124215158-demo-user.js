"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        login: "John",
        password: "415646548",
        email: "example@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: "Lucas",
        password: "3535345345",
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
