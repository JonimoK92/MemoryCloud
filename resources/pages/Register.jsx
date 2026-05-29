import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import '../css/register.css';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register } = useAuth();
    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();
        const result = await register(name, email, password);
        if (result.user) {
            navigate("/login")
        }
    }


    return (
        <div className="register_page">
            <div className="register_form">
                <form onSubmit={handleRegister}>

                    <h3>Créer un compte</h3>

                    <p className="separator">
                        <span>or</span>
                    </p>

                    <div className="input_box">
                        <label>Nom</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_box">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_box">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Sign up</button>

                    <p className="sign_in">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login">Se connecter</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}