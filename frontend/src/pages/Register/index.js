import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name_ong, setName ] = useState('');
    const [email_ong, setEmail ] = useState('');
    const [whatsapp_ong, setWhatsapp ] = useState('');
    const [city_ong, setCity ] = useState('');
    const [uf_ong, setUf ] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name_ong,
            email_ong,
            whatsapp_ong,
            city_ong,
            uf_ong
        };

        try {
            const response = await api.post('ongs', data);
            alert (`Seu ID de acesso: ${response.data.id_ong}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente!');
        }
        
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name_ong}
                        onChange={e => setName(e.target.value)} 
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email_ong}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp_ong}
                        onChange={e => setWhatsapp(e.target.value)}  
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city_ong}
                            onChange={e => setCity(e.target.value)}  
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf_ong}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}