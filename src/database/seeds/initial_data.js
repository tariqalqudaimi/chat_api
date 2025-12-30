/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {

  // await knex('messages').del();
  // await knex('users').del();

  
  const users = await knex('users').insert([
    { google_id: '12345', email: 'user1@gmail.com', display_name: 'Tariq Test' },
    { google_id: '67890', email: 'user2@gmail.com', display_name: 'Ahmed Test' }
  ]).returning('id');

  const user1Id = users[0].id;
  const user2Id = users[1].id;

  
  await knex('messages').insert([
    { content: 'Hello from Tariq!', user_id: user1Id },
    { content: 'Hi Tariq, how are you?', user_id: user2Id },
    { content: 'I am building this Chat API!', user_id: user1Id }
  ]);
};