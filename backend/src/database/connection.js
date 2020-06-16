const knex = require('knex');
const configuration = require('../../knexfile');

/**
 * PASSANDO PARA A CONFIG A CONFIGURAÇÃO DE DESENVOLVIMENTO
 */
const connection = knex(configuration.development);

/**
 * EXPORTANTO A CONEXÃO
 */
module.exports = connection;