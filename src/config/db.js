const knex = require('knex');
const knexConfig = require('../../knexfile');

// نقوم هنا بربط الإعدادات الموجودة في knexfile مع المحرك
const db = knex(knexConfig.development);

module.exports = db;