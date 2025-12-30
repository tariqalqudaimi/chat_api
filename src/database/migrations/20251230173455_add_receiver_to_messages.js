


exports.up = function(knex) {
  return knex.schema.table('messages', (table) => {
    table.integer('receiver_id').unsigned().references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.table('messages', (table) => {
    table.dropColumn('receiver_id');
  });
};