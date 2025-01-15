import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/styles/Global.css';
import '../assets/styles/BeerDetail.css';
import { Brewery } from '../interfaces/brewery';
import { getBreweryDetails } from '../services/api';

const BreweryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [brewery, setBrewery] = useState<Brewery | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            fetchBreweryDetails(Number(id));
        }
    }, [id]);

    const fetchBreweryDetails = async (id: number) => {
        try {
            const response = await getBreweryDetails(id);
            setBrewery(response.data); 
            console.log("1-brasserie infos", response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la brasserie :', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Chargement des détails...</p>;
    }

    if (!brewery) {
        return <p>Aucun détail disponible pour cette brasserie.</p>;
    }

    return (
        <div className="px-5" style={{ border: '2px solid red' }}>
        <Link to="/breweries" className="btn btn-secondary mb-3">Retour à la liste</Link>

        <div className="row justify-content-between mb-4 px-5" style={{ border: '2px solid blue' }}>
            <div className="col-lg-6" style={{ border: '2px solid green' }}>
                <img 
                    src="http://localhost:5173/src/assets/pictures/brasseriePicture1.jpg" 
                    alt={brewery.name} 
                    className="img-fluid rounded"
                />
            </div>

            <div className="col-lg-5" style={{ border: '2px solid green' }}>
                <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <h3 className="cust-title-beer">{brewery.name}</h3>
                    </div>
                </div>

                <p><span>Adresse : </span> {brewery.address}</p>
                <p><span>Pays :</span> {brewery.country}</p>
                <p><span>Description : </span>{brewery.description || 'Pas de description disponible'}</p>
                <p><span>Horaires:</span> {brewery.schedules || 'Pas d\'horaire disponible'}</p>
                <p><span>Réseaux sociaux :</span> {brewery.url_social_media || 'Pas de réseaux sociaux disponible'}</p>
            </div>
        </div>

        {/* Bloc pour afficher les bières */}
        <div className="mt-4" style={{ border: '2px solid orange' }}>
            <h4>Autres bières dispo dans la brasserie :</h4>
            {brewery.beers && brewery.beers.length > 0 ? (
                    <ul>
                        {brewery.beers.map((beer) => (
                            <li key={beer.id}>
                                <Link to={`/beers/${beer.id}`} className="beer-link">
                                    {beer.name} - {beer.type} ({beer.alcool_pourcent}%)
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Pas d'autres bières disponibles dans cette brasserie.</p>
                )}
        </div>
    </div>
    );
};

export default BreweryDetails;
