import React from "react";
import '../assets/styles/Login.css';

const Login: React.FC = () => {
    return (
        <div className="contact-form-container d-flex">
            {/* Bloc gauche */}
            <div className="left-block d-none-img">
                <img
                src="src/assets/pictures/picturebeer.jpg" 
                alt="Background"
                className="image"
                />
                <div className="overlay"></div>
            </div>

            {/* Bloc droit */}
            <div className="right-block d-flex align-items-center justify-content-center">
                <div className="form-content">
                    <h2 className="display-4 mb-5 text-center ft-login">Connexion</h2>
                    <form>
                        {/* Input Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Entrez votre email"
                                required
                            />
                        </div>

                        {/* Input Password */}
                        <div className="mb-5">
                            <label htmlFor="password" className="form-label">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Entrez votre mot de passe"
                                required
                            />
                            <div className="text-end mt-2">
                                <a href="#" className="text-decoration-none text-primary">
                                Mot de passe oublié ?
                                </a>
                            </div>
                        </div>

                        {/* Bouton Connexion */}
                        <button type="submit" className="btn btn-primary w-100">
                        Se connecter
                        </button>

                        {/* Lien vers l'inscription */}
                        <p className="text-center mt-3">
                        Pas encore inscrit ?{" "}
                            <a href="/signup" className="text-decoration-none text-primary">
                                Créez un compte
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
