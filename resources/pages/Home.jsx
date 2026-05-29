import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import '../css/home.css';

export default function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    async function handleLogout() {
        await logout();
        navigate("/login");
    };
    return (
        <div className="home_page">

            <div className="home_container">

                <h1 className="home_title">Projet</h1>
                <p className="home_subtitle"></p>

                <div className="home_links">

                    <Link to="/create/memory" className="home_card">
                        Créer un souvenir
                    </Link>

                    <Link to="/memories" className="home_card">
                        Voir les souvenirs
                    </Link>

                </div>

                <div className="home_actions">

                    <Link to="/login" className="home_link">
                        Connexion
                    </Link>

                    <Link to="/register" className="home_link">
                        Inscription
                    </Link>

                    <button onClick={handleLogout} className="logout_btn">
                        Se déconnecter
                    </button>

                </div>

            </div>

        </div>
    );
}