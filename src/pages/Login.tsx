import '../assets/styles/Login.css';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const auth = useContext(AuthContext);

    if (!auth) {
        return <p>Erreur d'authentification</p>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = auth.login(email, password);
        if (!success) {
            setError("Email ou mot de passe incorrect !");
        }
    };

    return (
        <div className="contact-form-container d-flex">
            {/* Bloc gauche */}
            <div className="left-block d-none-img">
                <img src="src/assets/pictures/picturebeer.jpg" alt="Background" className="image" />
                <div className="overlay"></div>
            </div>

            {/* Bloc droit */}
            <div className="right-block d-flex align-items-center justify-content-center">
                <div className="form-content">
                    <h2 className="display-4 mb-5 text-center ft-login">Connexion</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Entrez votre email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="container-password">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Entrez votre mot de passe" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <div className="text-end mt-2">
                                <a href="#" className="link-login">Mot de passe oublié ?</a>
                            </div>
                        </div>

                        {error && <p className="text-danger text-center">{error}</p>}

                        <div className="d-flex justify-content-center mb-4">
                            <button type="submit" className="btn btn-login">Se connecter</button>
                        </div>

                        <p className="text-center mt-3">
                            Pas encore inscrit ?{" "}
                            <Link to="/inscription" className="link-login">Créez un compte</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
