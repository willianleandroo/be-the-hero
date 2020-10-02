import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  
  // useEffect RECEBE DOIS PARAMETROS, O 1º É QUAL FUNCTION SERÁ EXECUTADA, E O 2º É AS DEPENDENCIAS Q INDICAM QUANDO ELA SERÁ EXECUTA, EX: (ongName) QUE EXECUTARIA A FUNCTION TODA VEZ Q O NOME DA ONG MUDASSE, DEIXANDO O ARRAY VAZIO A FUNCTION SÓ EXECUTARÁ UMA VEZ
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  // DELETANDO UM CASO
  async function handleDeleteIncident(id) {
    try{
      await api.delete(`incidents/${id}`, { 
         headers: {
           Authorization: ongId
         }
      });
      // CRIANDO UM FILTRO PARA QUE ASSIM Q FOR DELETADO UM INCIDENTE, CARREGAR SOMENTE OS DE ID DIFERENTE DESSE QUE FOI CRIADO... REMOVENDO O INCIDENTE DELETADO DA VARIAVEL incidents QUE É useState 
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente!');
    }
  }

  // LOGOUT
  function handleLogout() {
    localStorage.clear();

    // REDIRECIONANDO PARA A PAGINA INICIAL
    history.push('/');
  }

    return (
      <div className="profile-container">
          <header>
              <img src={logoImg} alt="Be The Hero" />
              <span>Bem vinda, {ongName}</span>

              <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
              {/* NÃO É NECESSÁRIO USAR ARROW FUNC NESSE CASO DO ONCLICK POIS  AFUNÇÃO N TEM RETORNO E NEM PARAMENTRO */}
              <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#E02041" />
              </button>
          </header>

          <h1>Casos cadastrados</h1>

          <ul>
            {incidents.map(incident => (
                  <li key={incident.id}>
                  <strong>Caso:</strong>
                  <p>{incident.title}</p>

                  <strong>DESCRIÇÃO:</strong>
                  <p>{incident.description}</p>

                  <strong>VALOR:</strong>
                  {/* FORMATANDO VALOR (PODE SER DATA TBM) COM A FUNC Intl (GLOBAL JAVASCRIPT) */}
                  <p>{Intl.NumberFormat('pt-BR', { style: 'currency',  currency: 'BRL'}).format(incident.value)}</p>

                   {/* COLOCANDO UMA ARROW FUNCTION NO ONCLICK, POIS SE COLOCARMOS SOMENTE O NOME DA FUNC, ELE EXECUTARÁ A FUNÇÃO ASSIM Q O COMPONENTE FOR CARREGADO E PASSARÁ O RETORNO DA FUNÇÃO AO ONCLICK */}
                  <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>
                  </button>
              </li>
            ))}
          </ul>
      </div>
    );
}