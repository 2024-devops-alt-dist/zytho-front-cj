import React, { useState } from "react";
import '../assets/styles/Login.css';
import '../assets/styles/Register.css';
import { Link } from "react-router-dom";
import axios from "axios";

const Registration: React.FC = () => {
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const API_URL = import.meta.env.VITE_API_URL + '/api/v1';

    // Fonction pour gérer l'envoi du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            setMessageType("error");
            return;
        }

        try {
            const { data } = await axios.post(API_URL + "/users", {
                firstname,
                email,
                password,
            });

            // Inscription réussie, réinitialiser les champs
            setFirstname("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setMessage("Inscription réussie !");
            setMessageType("success");

            console.log(data);
        } catch (error: any) {
            // Vérifier le type d'erreur et afficher un message approprié
            if (error.response) {
                // Le serveur a répondu avec un message d'erreur
                const errorMessage = error.response.data.error || "Une erreur est survenue, veuillez réessayer.";
                setMessage(errorMessage);
                setMessageType("error");
            } else if (error.request) {
                // La requête a été envoyée, mais aucune réponse n'a été reçue
                setMessage("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
                setMessageType("error");
            } else {
                // Autres erreurs
                setMessage("Une erreur inconnue est survenue.");
                setMessageType("error");
            }
        }
    };

    return (
        <div className="contact-form-container d-flex">
            {/* Bloc droit */}
            <div className="right-block d-flex align-items-center justify-content-center">
                <div className="form-content-register">
                    <p className="lead text-center">REJOIGNEZ LA TEAM</p>
                    <h2 className="display-4 mb-5 text-center ft-login ft-register">Créer un compte !</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mb-mob">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-mob">
                                    <label htmlFor="firstname" className="form-label">Prénom *</label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        className="form-control"
                                        placeholder="Entrez votre prénom"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="email" className="form-label">Email *</label>
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
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-mob">
                                    <label htmlFor="password" className="form-label">Mot de passe *</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Choisissez un mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="confirmPassword" className="form-label">Confirmez le mot de passe *</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirmez votre mot de passe"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4 mg-btn-register">
                            <button type="submit" className="btn-login">S'inscrire</button>
                        </div>

                        {message && (
                            <p className={`text-center mt-3 ${messageType === "error" ? "text-danger" : "text-success"}`}>
                                {message}
                            </p>
                        )}

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
