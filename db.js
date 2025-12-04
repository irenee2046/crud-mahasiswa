// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_mahasiswa',
  password: 'IdGs@2063',
  port: 5432
});

module.exports = pool;
