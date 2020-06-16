//IMPORTANTO MÓDULO À VARIÁVEL
const express = require('express');
//CORS
const cors = require('cors');
//
const routes = require('./routes');

//INSTANCIANDO APLICAÇÃO
const app = express();

app.use(cors());

/**
 * Declarando que será utilziado JSON como corpo de requisições
 */
app.use(express.json());


/**
 * IMPORTANDO AS ROTAS
 */
app.use(routes);

/**
 * Métodos HTTP:
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar um info no back-end
 * PUT: Alterar uma info o back-end
 * DELETE: Deletar uma info no back-end
 */

/**
 * Tipos de parâmetros
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpod a rqeuisição, utilizado para criar ou alterar recursos (nome de user, senhas)
 */



//PORTA PARA SER ACESSADA NO NAVEGADOR (NÚMERO DA PORTA)
app.listen(3333);