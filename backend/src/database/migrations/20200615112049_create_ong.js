
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
      table.string('id_ong').primary();
      table.string('name_ong').notNullable();
      table.string('email_ong').notNullable();
      table.string('whatsapp_ong').notNullable();
      table.string('city_ong').notNullable();
      table.string('uf_ong',2).notNullable();
      
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
