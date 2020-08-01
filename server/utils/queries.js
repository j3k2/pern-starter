const knex = require('../knex');

async function count(db, params) {
  const res = await knex(db)
    .count()
    .where(params)
    .first();

  return parseInt(res.count);
}

async function findOne(db, params, columns) {
  const res = await knex(db)
    .select(columns)
    .where(params)
    .first();

  return res;
}

async function create(db, params, columns = 'id') {
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
  create,
  count
}