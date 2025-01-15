import React from 'react';
import '../assets/styles/Navbar.css';
// import { NavLink } from 'react-router';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-md custom-bg-navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Zytho</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            {/* <NavLink to="/">Bières</NavLink> */}
                            <a className="nav-link" href="/">Bières</a>
                        </li>
                        <li className="nav-item">
                        {/* <NavLink to="/">Brasserie</NavLink> */}
                            <a className="nav-link" href="/breweries">Brasseries</a>
                        </li>
                    </ul>

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
