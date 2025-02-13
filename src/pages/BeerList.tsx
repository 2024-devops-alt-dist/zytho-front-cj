import React, { useState, useEffect } from 'react';
import '../assets/styles/BeerList.css';
import '../assets/styles/Global.css';
import '../App.css';
import { Beer } from '../interfaces/beer';
import { getBeers } from '../services/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BeerList: React.FC = () => {
    const [beers, setBeers] = useState<Beer[]>([]);
    const [filteredBeers, setFilteredBeers] = useState<Beer[]>([]);
    const [favorites, setFavorites] = useState<number[]>(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });
    const [nameFilter, setNameFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [originFilter, setOriginFilter] = useState<string>('');
    const [types, setTypes] = useState<string[]>([]);
    const [origins, setOrigins] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<Beer[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    useEffect(() => {
        fetchBeers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [nameFilter, typeFilter, originFilter, beers]);

    useEffect(() => {
        if (category) {
            setTypeFilter(category);
        }
    }, [category]);

    useEffect(() => {
        if (nameFilter.length > 0) {
            const filteredSuggestions = beers.filter((beer) =>
                beer.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setErrorMessage(filteredSuggestions.length === 0 ? 'Bière non existante' : null);
        } else {
            setSuggestions([]);
            setErrorMessage(null);
        }
    }, [nameFilter, beers]);

    const fetchBeers = async () => {
        try {
            const response = await getBeers();
            setBeers(response.data);
            setFilteredBeers(response.data);

            const allTypes = [...new Set(response.data.map((beer) => beer.type))];
            const allOrigins = [
                ...new Set(response.data.map((beer) => beer.details_beer?.pays).filter((pays) => pays)),
            ];
            setTypes(allTypes);
            setOrigins(allOrigins);
        } catch (error) {
            console.error('Erreur lors de la récupération des bières :', error);
        }
    };

    const applyFilters = () => {
        let filteredList = beers;

        if (nameFilter) {
            filteredList = filteredList.filter((beer) =>
                beer.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (typeFilter) {
            filteredList = filteredList.filter((beer) =>
                beer.type.toLowerCase().includes(typeFilter.toLowerCase())
            );
        }

        if (originFilter) {
            filteredList = filteredList.filter((beer) =>
                beer.details_beer?.pays.toLowerCase().includes(originFilter.toLowerCase())
            );
        }

        setFilteredBeers(filteredList);
    };

    const handleSuggestionClick = (beerId: number) => {
        navigate(`/beers/${beerId}`);
    };

    // Partie Favories : seul le btn coeur est fonctionnel pour le moment. Je n'arrive pas encore à faire persister les favories à la deco/reco
    const isAuthenticated = !!localStorage.getItem('user');

    // Réinitialiser les favoris lors de la déconnexion
    useEffect(() => {
        if (!isAuthenticated) {
            setFavorites([]);
            localStorage.setItem('favorites', JSON.stringify([])); // Vide le localStorage
        }
    }, [isAuthenticated]);

    const toggleFavorite = (beerId: number) => {
        if (!isAuthenticated) {
            alert("Vous devez être connecté pour ajouter une bière en favori.");
            navigate('/login');
            return;
        }

        let updatedFavorites;
        if (favorites.includes(beerId)) {
            updatedFavorites = favorites.filter((id) => id !== beerId);
        } else {
            updatedFavorites = [...favorites, beerId];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center custon-txt">Liste des Bières</h1>
            </div>

            <div className="d-flex">
                <div className="d-flex w-100 justify-content-between align-items-center flex-wrap cust-test">
                    <div className="col-12 col-md-3 position-relative">
                        <input
                            type="text"
                            placeholder="Rechercher une bière"
                            className="form-control"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                        {nameFilter.length > 0 && (
                            <div className="dropdown-menu show">
                                {suggestions.length > 0 ? (
                                    suggestions.map((beer) => (
                                        <button
                                            key={beer.id}
                                            className="dropdown-item"
                                            onClick={() => handleSuggestionClick(beer.id)}
                                        >
                                            {beer.name}
                                        </button>
                                    ))
                                ) : (
                                    <div className="dropdown-item text-danger">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="d-flex col-12 col-md-8 justify-content-end flex-wrap cust-mob-space">
                        <div className="col-12 col-sm-6 col-md-5 col-lg-4 mb-2 mb-md-0 me-0 me-md-3">
                            <select
                                className="form-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="">Filtrer par type</option>
                                {types.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-sm-6 col-md-5 col-lg-4">
                            <select
                                className="form-select"
                                value={originFilter}
                                onChange={(e) => setOriginFilter(e.target.value)}
                            >
                                <option value="">Filtrer par origine</option>
                                {origins.map((origin, index) => (
                                    <option key={index} value={origin}>
                                        {origin}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-4">
                <div className="row justify-content-center">
                    {filteredBeers && filteredBeers.length > 0 ? (
                        filteredBeers.map((beer) => (
                            <div key={beer.id} className="col-12 col-md-4 mb-4 d-flex justify-content-center">
                                <div className="card h-100">
                                    <img
                                        src="src/assets/pictures/beersPicture1.jpg"
                                        alt={beer.name}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title fs-cust">{beer.name}</h5>
                                            <div className="alcool-percent">{beer.alcool_pourcent}% alc.</div>
                                        </div>
                                        <div>
                                            <p className="italic">Type : Bière {beer.type}</p>
                                            <p>
                                                {beer.details_beer?.description || 'Pas de description disponible'}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <Link to={`/beers/${beer.id}`} className="btn btn-one">
                                                Voir plus
                                            </Link>
                                            <button className="btn " onClick={() => toggleFavorite(beer.id)}>
                                                {favorites.includes(beer.id) ? '❤️' : '🤍'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Aucune bière disponible pour le moment.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BeerList;
