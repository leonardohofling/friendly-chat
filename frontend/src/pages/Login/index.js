import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

export default function Login() {
    
    const [name, setName] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            if (name.length) {
                localStorage.setItem('name', name);
                history.push('/chat');
            }            
            
        }
        catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Informe seus dados para entrar</h1>
                    <input 
                        placeholder="Seu Nome"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
        </div>
    )
};