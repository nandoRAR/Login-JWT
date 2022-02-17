import React, { useState } from "react";
import './style.css';
import useApi from '../../helpers/Api';
import { doLogin } from '../../helpers/authHeader';

const Page = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        if (password !== confirmPassword) {
            setError('Senhas não batem');
            setDisabled(false);
            return;
        }

        const json = await api.register(name, email, password);
        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = '/';
        }

        setDisabled(false);

    }
    return (
        <div className="container">
            <h1>Cadastro</h1>
            <div className="PageArea">

                {error &&
                    <div className="errorMessage">{error}</div>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Nome</div>
                        <div className="area--input">
                            <input type="text" value={name} onChange={e => setName(e.target.value)} disabled={disabled} minLength="3" maxLength='50' required />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} minLength="3" maxLength="100" required />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={disabled} minLength="6" maxLength="200" required />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={disabled} minLength="6" maxLength="200" required />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Cadastrar</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default Page;