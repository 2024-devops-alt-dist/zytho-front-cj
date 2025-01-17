import React from 'react';
import '../assets/styles/Navbar.css';
import { NavLink } from 'react-router';
// import { NavLink } from 'react-router';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-md custom-bg-navbar">
            <div className="container-fluid mx-5">
                <img className="logo-custom" src="src/assets/pictures/zythoLogo.png"/>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav mx-auto">
                        <NavLink to="/" className="nav-link">Accueil</NavLink>
                        <NavLink to="/beers" className="nav-link">Bières</NavLink>
                        <NavLink to="/breweries" className="nav-link">Brasserie</NavLink>
                    </div>

                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Profil
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="/login">Connexion</a></li>
                            <li><a className="dropdown-item" href="/logout">Déconnexion</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
