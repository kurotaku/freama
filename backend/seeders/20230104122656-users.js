'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      { name: '太郎',  email: 'taro@example.com', password: passwordEncode('taro-password'), createdAt: now, updatedAt: now, emailVerifiedAt: now},
      { name: '次郎',  email: 'jiro@example.com', password: passwordEncode('jiro-password'), createdAt: now, updatedAt: now, emailVerifiedAt: now},
      { name: '三郎',  email: 'saburo@example.com', password: passwordEncode('saburo-password'), createdAt: now, updatedAt: now, emailVerifiedAt: now},
      { name: '四郎',  email: 'shiro@example.com', password: passwordEncode('shiro-password'), createdAt: now, updatedAt: now, emailVerifiedAt: now},
      { name: '五郎',  email: 'goro@example.com', password: passwordEncode('goro-password'), createdAt: now, updatedAt: now, emailVerifiedAt: now},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

const passwordEncode = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}