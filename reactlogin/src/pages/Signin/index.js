import React, { useState } from "react";
import './style.css';
import useApi from '../../helpers/Api';
import { doLogin } from '../../helpers/authHeader';

const Page = () => {
    const api = useApi();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);
        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = '/';
        }

        setDisabled(false);

    }
    return (
        <div className="container">
            <h1>Login</h1>
            <div className="PageArea">

                {error &&
                    <div className="errorMessage">{error}</div>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} required />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={disabled} required />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="area--input">
                            <input type="checkbox" checked={rememberPassword} onChange={() => setRememberPassword(!rememberPassword)} disabled={disabled} />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Login</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default Page;