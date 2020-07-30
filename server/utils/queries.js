const knex = require('../knex');

async function findOne(db, params, columns) {
  const res = await knex(db)
    .select(columns)
    .where(params);

  if (!res.length) {
    return null;
  }

  return res[0];
}

async function create(db, params, columns) {
  const res = await knex(db)
    .returning(columns)
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