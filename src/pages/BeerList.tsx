import React, { useState, useEffect } from 'react';
import '../assets/styles/BeerList.css';
import '../App.css'
import { Beer } from '../interfaces/beer';
import { getBeers } from '../services/api';
import { Link } from 'react-router';
const BeerList: React.FC = () => {
    const [beers, setBeers] = useState<Beer[]>([]);

    useEffect(() => {
        fetchBeers();
    }, []);

    const fetchBeers = async () => {
        try {
            const response = await getBeers();
            setBeers(response.data);
            console.log("1-Bieres:", response.data); 
        } catch (error) {
            console.error('Erreur lors de la récupération des bières :', error);
        }
    };
    

    return (
        <>
        <Link to="/">Retour</Link>
        <div className="container my-4" style={{ border: '2px solid blue' }}>
            <h1 className="text-center custon-txt">Liste des Bières Artisanales</h1>
            
            <div className="row justify-content-center" style={{ border: '2px solid green' }}>
                {beers && beers.length > 0 ? (
                    beers.map((beer) => (
                    <div key={beer.id} className="col-12 col-lg-4 mb-4 d-flex justify-content-center">
                        <div className="card h-100">
                            <img src="src/assets/pictures/beersPicture1.jpg" alt={beer.name} className="card-img-top" />
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title">{beer.name}</h5>
                                    <div className="alcool-percent">{beer.alcool_pourcent}% alc.</div>
                                </div>
                                <div>
                                    <p>{beer.details_beer?.description || 'Pas de description disponible'}</p>
                                </div>
                                <Link to={`/beers/${beer.id}`} className="btn btn-primary mt-3">
                                            Voir plus
                                </Link>
                            </div>
                        </div>
                    </div>))
                ) : (
                    <p className="text-center">Aucune bière disponible pour le moment.</p>)}
            </div>
        </div>
        </>
    );
};

export default BeerList;