const faker = require('faker')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('clucks').del()
  .then(function(){
    const clucks = []
    for(let i =0;i<100;i++){
      clucks.push({
        username: faker.internet.userName(),
        image_url: faker.image.imageUrl(),
        content: faker.lorem.paragraph(),
        created_at: faker.date.past()
      })
    }
    return knex('clucks').insert(clucks)
  })
};
