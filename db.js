const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  password: process.env.dbPassword,
  host: 'localhost',
  port: 5432,
  database: 'starter'
});

module.exports = pool;