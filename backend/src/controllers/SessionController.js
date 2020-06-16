const connection = require("../database/connection");

module.exports = {
    //CRIANDO UMA SESSÃO
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id_ong', id)
            .select('name_ong')
            .first();

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID!' });
        }

        return response.json(ong);
    }
}