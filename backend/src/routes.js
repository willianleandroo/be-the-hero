const express = require('express');
/**
 * IMPORTANDO O CONTROLLER DE ONG
 */
const OngController = require('./controllers/OngController');
/**
 * IMPORTANDO O CONTROLLER DE CASOS
 */
const IncidentController = require('./controllers/IncidentController');
//PROFILE
const ProfileController = require('./controllers/ProfileController');
//SESSION
const SessionController = require('./controllers/SessionController');


/**
 * DESACOPLANDO MODULO DE ROTAS DO EXPRESS
 */
const routes = express.Router();

/**
 * LISTANDO AS ONGS
 */
routes.get('/ongs', OngController.index);
/**
 * CADASTRO DE ONGS
 */
routes.post('/ongs', OngController.create);


//LSITAGEM INCIDENTES
routes.get('/incidents', IncidentController.index);
/**
 * CADASTRO DE CASOS
 */
routes.post('/incidents', IncidentController.create);
/**
 * DELETANDO CASOS
 */
routes.delete('/incidents/:id', IncidentController.delete);


//Profile
routes.get('/profile', ProfileController.index);

//SESSION
routes.post('/sessions', SessionController.create);


//EXPORTANTO AS ROTAS
module.exports = routes;