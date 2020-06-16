/**
 * IMPORTANDO A CONEXÃO COM O DB
 */
const connection = require('../database/connection');
const crypto = require('crypto');

//UTILIZANDO FUNÇÃO 'async' NA ROTA PARA Q POSSAMOS USAR A FUNÇÃO 'await' DENTRO DELA 
module.exports = {

    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create (request, response) {
        const { name_ong, email_ong, whatsapp_ong, city_ong, uf_ong } = request.body;
    
        /**
         * GERANDO O ID DA ONG ALEATORIAMENTE E CONVERTENDO PARA STRING EM HEXADECIAMAL
         */
        const id_ong = crypto.randomBytes(4).toString('HEX');
    
        /**
         * UTILZIANDO A FUNÇÃO 'await' PARA EXCEUTAR A PROXIMA FUNÇÃO DEPOIS Q TERMINAR DE EXCUTAR A FUNÇÃO ABAIXO
         */
        await connection('ongs').insert({
            id_ong,
            name_ong,
            email_ong,
            whatsapp_ong,
            city_ong,
            uf_ong,
        })
    
        //RETORNANDO O ID DA ONG
        return response.json({ id_ong });
    }
};