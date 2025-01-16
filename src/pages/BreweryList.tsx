import React, { useState, useEffect } from 'react';
import '../assets/styles/BeerList.css';
import '../App.css'
import { getBrewery } from '../services/api';
import { Link } from 'react-router';
import { Brewery } from '../interfaces/brewery';

const BreweryList: React.FC = () => {
    const [breweries, setBreweries] = useState<Brewery[]>([]);

    useEffect(() => {
        fetchBreweries();
    }, []);

    const fetchBreweries = async () => {
        try {
            const response = await getBrewery();
            setBreweries(response.data);
            console.log('Données récupérées :', response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des brasseries :', error);
        }
    };
    
    return (
        <>
        <div className="container my-4">
            <h1 className="text-center custon-txt mt-5">Liste des Brasseries</h1>
            
            <div className="row justify-content-center">
                {breweries && breweries.length > 0 ? (
                    breweries.map((brewery) => (
                    <div key={brewery.id} className="col-12 col-lg-4 mb-4 d-flex justify-content-center">
                        <div className="card h-100">
                            <img src="src/assets/pictures/brasseriePicture1.jpg" alt={brewery.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{brewery.name}</h5>
                                <p>{brewery.country || 'Pas de pays disponible'}</p>
                                <p>Bière(s) disponible(s) : {brewery.beers ? brewery.beers.length : 0}</p>
                                <Link to={`/breweries/${brewery.id}`} className="btn btn-one mt-3">
                                            Voir plus
                                </Link>
                            </div>
                        </div>
                    </div>))
                ) : (
                    <p className="text-center">Aucune brasseries disponible pour le moment.</p>)}
            </div>
        </div>
        </>
    );
};

export default BreweryList;