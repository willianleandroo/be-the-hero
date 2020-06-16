const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        //PAGINAÇÃO
        const { page = 1 } = request.query;

        //PEGANDO A QTD TOTAL DE CASOS PARA SER EXIBIDA NO FRONTEND
        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
        //REALIZANDO UM JOIN PARA TRAZER AS INFOS DA ONG RELACIONADA AO INCIDENTE
        .join('ongs', 'ongs.id_ong', '=', 'incidents.ong_id')
        //LIMITE DE BUSCAS
        .limit(5)
        //PULANDO 5 REGISTROS A CADA PAGE
        .offset( (page - 1 ) * 5 )
        //PEGANDO TODOS OS DADOS DA TABELA 'incidents' E SOMENTE OS ESPECÍFICOS DA TABELA 'ongs'
        .select([
            'incidents.*', 
            'ongs.name_ong', 
            'ongs.email_ong',
            'ongs.whatsapp_ong',
            'ongs.city_ong', 
            'ongs.uf_ong'
        ]);

        //RETORNANDO O TOTAL DE CASOS ATRAVÉS DO CABEÇALHO DA RESPOSTA
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        /**
         * PEGANDO O ID DA ONG AUTENTICADA PARA ATRELAR AO INCIDENTE
         * É NO HEADERS QUE FICAM GUARDADOS DADOS DO USUÁRIO AUTENTICADO, COMO QM ESTÁ LOGADO, LOCALIZAÇÃO, RESUMINDO É O CONTEXTO DA REQUISIÇÃO
         */
        const ong_id = request.headers.authorization;
        /**
         * PEGANDO A PRIMEIRA CHAVE DO ARRAY DE INSERÇÃO NO DB COM O USO DE 'const [id]' DESSE MODO O ID DO INCIDENTE ESTARÁ ATRIBUÍDO NA const [id]
         */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response){
        //PEGANDO O ID QUE VEM NO PARAMETRO DA REQUISIÇÃO
        const { id } = request.params;
         /**
         * PEGANDO O ID DA ONG AUTENTICADA PARA ATRELAR AO INCIDENTE
         * É NO HEADERS QUE FICAM GUARDADOS DADOS DO USUÁRIO AUTENTICADO, COMO QM ESTÁ LOGADO, LOCALIZAÇÃO, RESUMINDO É O CONTEXTO DA REQUISIÇÃO
         */
        const ong_id = request.headers.authorization;

        /**
         * BUSCANDO O 'ong_id' DO INCIDENTE QUE TENHA O ID PASSADO POR PARAMETRO
         */
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            //RETORNA O PRIMEIRO RESULTADO, POIS SÓ VAI EXISTIR UM INCIDENTE PARA AQUELE ID
            .first();

        /**
         * VERIFICANDO SE O ong_id DO INCIDENTE É O MESMO DO PASSADO PELO HEADERS
         */
        if (incident.ong_id != ong_id){
            //ALTERANDO O CODIGO DE HTTP STATUS PARA O 401 (NÃO AUTORIZADO)
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        /**
         * DELETANDO O INCIDENTE CASO PASSE PELA VERIFICAÇÃO ACIMA
         */
        await connection('incidents').where('id', id).delete();

        /**
         * RETORNANDO O STATUS 204 ('SUCCESS', 'NO CONTENT')
         * 'send' ENVIA A RESPOSTA SEM CORPO, 'VAZIA'
         */
        return response.status(204).send();
    }
}