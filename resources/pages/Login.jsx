import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import '../css/login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        const result = await login(email, password);

        if (result.token) {
            navigate("/")
        }
    }


    return (
        <div className="login_page">
            <div className="login_form">

                <form onSubmit={handleLogin}>

                    <h3>Connexion</h3>

                    <p className="separator">
                        <span>ou</span>
                    </p>

                    <div className="input_box">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_box">
                        <div className="password_title">
                            <label>Mot de passe</label>
                            <a href="#">Mot de passe oublié ?</a>
                        </div>

                        <input
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Se connecter</button>

                    <p className="sign_up">
                        Pas encore de compte ?{" "}
                        <Link to="/register">Créer un compte</Link>
                    </p>

                </form>

            </div>
        </div>
    );
}