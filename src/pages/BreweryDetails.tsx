import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/styles/Global.css';
import '../assets/styles/BeerDetail.css';
import '../assets/styles/BreweryDetail.css';
import { Brewery } from '../interfaces/brewery';
import { getBreweryDetails } from '../services/api';

const BreweryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [brewery, setBrewery] = useState<Brewery | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const URL_FRONT = import.meta.env.FRONT_URL;

    useEffect(() => {
        if (id) {
            fetchBreweryDetails(Number(id));
        }
    }, [id]);

    const fetchBreweryDetails = async (id: number) => {
        try {
            const response = await getBreweryDetails(id);
            setBrewery(response.data); 
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
        <>
        <div className="mt-5 px-5 mb-4">
            <Link to="/breweries" className="mb-3 return-list"> {"<"} Retour à la liste</Link>
        </div>
        <div className="px-5 pt-4 pb-1">
            <div className="row justify-content-between mb-4 px-5 info-beer-mob">
                <div className="col-lg-6">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img 
                                    src="/assets/pictures/brasseriePicture1.jpg"
                                    alt={`${brewery.name}`} 
                                    className="d-block w-100 img-fluid rounded"
                                />
                            </div>
                            <div className="carousel-item">
                                <img 
                                    src="/assets/pictures/brasseriePicture1.jpg"
                                    alt={`${brewery.name}`} 
                                    className="d-block w-100 img-fluid rounded"
                                />
                            </div>
                            <div className="carousel-item">
                                <img 
                                    src="/assets/pictures/brasseriePicture1.jpg" 
                                    alt={`${brewery.name}`} 
                                    className="d-block w-100 img-fluid rounded"
                                />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>

                <div className="col-lg-6 info-beer-mob m-title-mob">
                    <div className="mb-3">
                        <div className="d-flex justify-content-between">
                            <h3 className="cust-title-beer">{brewery.name}</h3>
                        </div>
                    </div>

                    <p><span>Description : </span>{brewery.description || 'Pas de description disponible'}</p>
                    <p className="mt-3"><span>Adresse : </span> {brewery.address}</p>
                    <p><span>Pays :</span> {brewery.country}</p>

                    <p className="my-3"><span>Horaires:</span> {brewery.schedules || 'Pas d\'horaire disponible'}</p>
                    <p><span>Réseaux sociaux :</span> {brewery.url_social_media || 'Pas de réseaux sociaux disponible'}</p>
                </div>
            </div>
        </div>

        {/* Bloc pour afficher les bières */}
        <div className="bg-color-cust beers-container">
            <h4 className="py-4">Autres bières disponible dans cette brasserie :</h4>
            {brewery.beers && brewery.beers.length > 0 ? (
                <div className="d-flex overflow-auto beers-list">
                    {brewery.beers.map((beer) => (
                        <div key={beer.id} className="card card-custom h-100 beer-card">
                            <img
                                src="/assets/pictures/beersPicture1.jpg"
                                alt={beer.name}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{beer.name}</h5>
                                <p className="card-text">{beer.type} - {beer.alcool_pourcent}% alc.</p>
                                <Link to={`/beers/${beer.id}`} className="btn btn-one mt-3">Voir plus</Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Pas d'autres bières disponibles dans cette brasserie.</p>
            )}
        </div>
        </>
    );
};

export default BreweryDetails;
