'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = await queryInterface.sequelize.query(
      `SELECT * FROM Users;`,
      {type: Sequelize.QueryTypes.SELECT}
    );

    const usersArray = [];
    const now = new Date();

    users.map((user) =>{
      usersArray.push({userId: user.id, name: 'サンプルアイテム', price: 1000, createdAt: now, updatedAt: now});
    });

    queryInterface.bulkInsert('Items', usersArray, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Items', null, {});
  }
};
