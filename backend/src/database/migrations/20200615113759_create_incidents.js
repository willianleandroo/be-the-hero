
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    /**
     * CHAVE PRIMARIA AUTO_INCREMENT
     */
    table.increments();

    /**
     * CAMPOS DA TABLE
     */
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    /**
     * RELACIONAMENTO COM A TABLE 'ongs'
     */
    table.string('ong_id').notNullable();

    /**
     * CHAVE ESTRANGEIRA
     */
    table.foreign('ong_id').references('id_ong').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
