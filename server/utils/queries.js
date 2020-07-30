const knex = require('../knex');

async function findOne(db, params) {
  const res = await knex(db)
    .where(params);

  if (!res.length) {
    return null;
  }

  return res[0];
}

async function create(db, params) {
  const res = await knex(db)
    .returning('id')
    .insert(params);

  if (!res.length) {
    return null;
  }  
  
  return res[0];
}

module.exports = {
  findOne,
  create
}