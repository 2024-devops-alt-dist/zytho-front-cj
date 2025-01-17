import React from "react";
import '../assets/styles/Login.css';
import '../assets/styles/Register.css';
import { Link } from "react-router";


const Registration: React.FC = () => {
    return (
        <div className="contact-form-container d-flex">
            {/* Bloc droit */}
            <div className="right-block d-flex align-items-center justify-content-center">
                <div className="form-content-register">
                    <p className="lead text-center">REJOIGNEZ LA TEAM</p>
                    <h2 className="display-4 mb-5 text-center ft-login ft-register">Créer un compte !</h2>
                    <form>
                        <div className="mb-3 mb-mob">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-mob">
                                    <label htmlFor="firstname" className="form-label">Prénom *</label>
                                    <input type="text" id="firstname" className="form-control" placeholder="Entrez votre prénom" required />
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <label htmlFor="email" className="form-label">Email *</label>
                                    <input type="email" id="email" className="form-control" placeholder="Entrez votre email" required />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-mob">
                                    <label htmlFor="password" className="form-label">Mot de passe *</label>
                                    <input type="password" id="password" className="form-control" placeholder="Choisissez un mot de passe" required />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="confirmPassword" className="form-label">Confirmez le mot de passe *</label>
                                    <input type="password" id="confirmPassword" className="form-control" placeholder="Confirmez votre mot de passe" required />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4 mg-btn-register">
                            <button type="submit" className="btn-login">S'inscrire</button>
                        </div>

                        <p className="text-center mt-3">
                            Déjà inscrit ?{" "}
                            <Link to="/login" className="link-login">Connectez-vous</Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Bloc gauche */}
            <div className="left-block d-none-img">
                <img src="src/assets/pictures/picturebeer2.jpg" alt="Background" className="image" />
                <div className="overlay"></div>
            </div>
        </div>
    );
};

export default Registration;