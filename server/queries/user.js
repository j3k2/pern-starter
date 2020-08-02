const { findOne, create, count } = require('./common');

function countUsers(params) {
  return count('users', params);
}

async function findUser(params, outputColumns) {
  return findOne('users', params, outputColumns);
}

async function createUser(params) {
  return create('users', params);
}

module.exports = {
  findUser,
  createUser,
  countUsers
}