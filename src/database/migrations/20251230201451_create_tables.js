
/**
 * هذا الـ migrations.
 * وظيفته اضافة الجداول الى قاعدة البيانات عند تنفيذ الامر الخاص بالترحيل
 */

exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('google_id').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('display_name').notNullable();
      table.string('avatar').nullable();
      table.timestamps(true, true);

    })
    .createTable('messages', (table) => {
      table.increments('id').primary();
      table.text('content').notNullable();
      table.integer('user_id').unsigned().notNullable()
           .references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
      table.integer('receiver_id').unsigned().references('id').inTable('users');
      
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('messages')
    .dropTableIfExists('users');
};
