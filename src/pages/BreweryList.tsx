import React, { useState, useEffect } from 'react';
import '../assets/styles/BeerList.css';
import '../App.css';
import { getBrewery } from '../services/api';
import { Link } from 'react-router';
import { Brewery } from '../interfaces/brewery';

const BreweryList: React.FC = () => {
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [filteredBreweries, setFilteredBreweries] = useState<Brewery[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [countryFilter, setCountryFilter] = useState<string>('');
    const [countries, setCountries] = useState<string[]>([]);

    useEffect(() => {
        fetchBreweries();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [nameFilter, countryFilter, breweries]);

    const fetchBreweries = async () => {
        try {
            const response = await getBrewery();
            setBreweries(response.data);
            setFilteredBreweries(response.data);

            const allCountries = [...new Set(response.data.map((brewery) => brewery.country).filter(Boolean))];
            setCountries(allCountries);
        } catch (error) {
            console.error('Erreur lors de la récupération des brasseries :', error);
        }
    };

    const applyFilters = () => {
        let filteredList = breweries;

        if (nameFilter) {
            filteredList = filteredList.filter((brewery) =>
                brewery.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (countryFilter) {
            filteredList = filteredList.filter((brewery) =>
                brewery.country.toLowerCase() === countryFilter.toLowerCase()
            );
        }

        setFilteredBreweries(filteredList);
    };

    return (
        <>
            <div className="container mt-5">
            <h1 className="text-center custon-txt">Liste des Brasseries</h1>
        </div> 

            {/* Bloc de filtre */}
            <div className="container mt-5 mb-4">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Filtrer par nom"
                            className="form-control"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 cust-mob-space">
                        <select
                            className="form-select"
                            value={countryFilter}
                            onChange={(e) => setCountryFilter(e.target.value)}
                        >
                            <option value="">Filtrer par pays</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Liste des brasseries */}
            <div className="container py-4">
                <div className="row justify-content-center">
                    {filteredBreweries && filteredBreweries.length > 0 ? (
                        filteredBreweries.map((brewery) => (
                            <div key={brewery.id} className="col-12 col-lg-4 mb-4 d-flex justify-content-center">
                                <div className="card h-100">
                                    <img
                                        src="src/assets/pictures/brasseriePicture1.jpg"
                                        alt={brewery.name}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{brewery.name}</h5>
                                        <p>{brewery.country || 'Pas de pays disponible'}</p>
                                        <p>Bière(s) disponible(s) : {brewery.beers ? brewery.beers.length : 0}</p>
                                        <Link to={`/breweries/${brewery.id}`} className="btn btn-one mt-3">
                                            Voir plus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Aucune brasserie disponible pour le moment.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default BreweryList;
