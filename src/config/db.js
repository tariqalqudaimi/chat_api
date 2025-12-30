
/**
 * إعداد الاتصال بقاعدة البيانات.
 * 
 * يقوم هذا الملف بتهيئة مكتبة Knex.js بناءً على الإعدادات الموجودة في knexfile.js.
 * يتم استيراد هذا الملف في الـ Repositories لتنفيذ الاستعلامات.
 */
const knex = require('knex');
const knexConfig = require('../../knexfile');


const db = knex(knexConfig.development);

module.exports = db;