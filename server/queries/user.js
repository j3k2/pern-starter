const knex = require('../knex');

async function findUser(params) {
  const res = await knex('users')
    .where(params);

  if (!res.length) {
    return null;
  }

  return res[0];
}

async function createUser(params) {
  const res = await knex('users')
    .returning('id')
    .insert(params);

  if (!res.length) {
    return null;
  }  
  
  return res[0];
}

module.exports = {
  findUser,
  createUser
}