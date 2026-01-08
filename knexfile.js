const path = require('path');
require('dotenv').config();
console.log("Password from ENV:", process.env.DB_PASS); 
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'postgres',
      password: String(process.env.DB_PASS || ''),
      database: process.env.DB_NAME || 'chat_db',
      port: process.env.DB_PORT || 5432,
    },
    pool: {
      min: 2, 
      max: 10 
    },
    migrations: {
      directory: path.join(__dirname, 'src/database/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src/database/seeds')
    }
  }
};