import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBeerDetails } from '../services/api';
import { Beer } from '../interfaces/beer';
import '../assets/styles/Global.css';
import '../assets/styles/BeerDetail.css';

const BeerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [beer, setBeer] = useState<Beer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            fetchBeerDetails(Number(id));
        }
    }, [id]);

    const fetchBeerDetails = async (id: number) => {
        try {
            const response = await getBeerDetails(id);
            setBeer(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la bière :', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Chargement des détails...</p>;
    }

    if (!beer) {
        return <p>Aucun détail disponible pour cette bière.</p>;
    }

    return (
        <div className="px-5" style={{ border: '2px solid red' }}>
            <Link to="/" className="btn btn-secondary mb-3">Retour à la liste</Link>

            <div className="row justify-content-between mb-4 px-5 " style={{ border: '2px solid blue' }}>
                <div className="col-lg-6 " style={{ border: '2px solid green' }}>
                    <img 
                        src="http://localhost:5173/src/assets/pictures/beersPicture1.jpg" 
                        alt={beer.name} 
                        className="img-fluid rounded"
                    />
                </div>

                {/* Détails texte de la bière */}
                <div className="col-lg-5" style={{ border: '2px solid green' }}>
                    <div className="mb-3">
                        <div className="d-flex justify-content-between">
                            <h3 className="cust-title-beer">{beer.name}</h3>
                            <p><span className="alc-cust">{beer.alcool_pourcent}</span><span className="pourcent">%</span> alc.</p>
                        </div>
                    </div>

                    <p><span>Type : </span>Bière {beer.type}</p>
                    <p><span>Description :</span> {beer.details_beer?.description || 'Pas de description disponible'}</p>
                    <p><span>Origine : </span>{beer.details_beer?.pays}</p>
                    <p><span>Conditionnement:</span> {beer.details_beer?.conditionnement}</p>
                    <p><span>Contenance:</span> {beer.details_beer?.contenance} cl</p>
                    <p><span>Amertume:</span> {beer.details_beer?.amertume ?? 'Non spécifié'}/5</p>
                    <p><span>Douceur:</span> {beer.details_beer?.douceur ?? 'Non spécifié'}/5</p>
                    <p><span>Fruité:</span> {beer.details_beer?.fruite ?? 'Non spécifié'}/5</p>
                    <p><span>IBU:</span> {beer.details_beer?.ibu}</p>
                    <p><span>EBC:</span> {beer.details_beer?.ebc}</p>
                    <p><span>Vendeur : </span> <a href={beer.brewery.url_social_media} target="_blank" rel="noopener noreferrer">{beer.brewery.name}</a></p>
                </div>
            </div>

            {/* Bières associées à la brasserie */}
            <div className="px-5" style={{ border: '2px solid blue' }}>
                <h4 className="text-xl font-semibold mb-3">Bières associées de la brasserie</h4>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <img 
                                src="src/assets/pictures/beersPicture1.jpg"
                                alt="Bière associée" 
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{beer.name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeerDetails;
