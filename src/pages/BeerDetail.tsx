import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteBeer, getBeerDetails } from '../services/api';
import { Beer } from '../interfaces/beer';
import '../assets/styles/Global.css';
import '../assets/styles/BeerDetail.css';
import { AuthContext } from '../context/AuthContext';

const BeerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [beer, setBeer] = useState<Beer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchBeerDetails(Number(id));
        }
    }, [id]);

    const fetchBeerDetails = async (id: number) => {
        try {
            const response = await getBeerDetails(id);
            setBeer(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la bière :', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!beer) return;
    
        try {
            await deleteBeer(beer); 
            navigate('/beers');
        } catch (error) {
            console.error('Erreur lors de la suppression de la bière:', error);
        }
    };
    
    if (loading) {
        return <p>Chargement des détails...</p>;
    }

    if (!beer) {
        return <p>Aucun détail disponible pour cette bière.</p>;
    }

    return (
        <>
        <div className="mt-5 px-5 mb-4">
            <Link to="/beers" className="mb-3 return-list"> {"<"} Retour à la liste</Link>
        </div>
        <div className="px-5">
            <div className="row justify-content-between mb-cust px-5 info-beer-mob" >
                <div className="col-lg-6 " >
                    <img 
                        src="http://localhost:5173/src/assets/pictures/beersPicture1.jpg" 
                        alt={beer.name} 
                        className="img-fluid rounded"
                    />
                </div>

                {/* Détails texte de la bière */}
                <div className="col-lg-6 info-beer-mob" >
                    <div className="mb-3">
                        <div className="d-flex justify-content-between space-mob">
                            <h3 className="cust-title-beer">{beer.name}</h3>
                            <p>
                                <span className="alc-cust">{beer.alcool_pourcent}</span>
                                <span className="pourcent">%</span> alc.
                            </p>
                        </div>
                    </div>

                    <p><span>Type : </span>Bière {beer.type}</p>
                    <p><span>Origine : </span>{beer.details_beer?.pays}</p>
                    <p><span>Description :</span> {beer.details_beer?.description || 'Pas de description disponible'}</p>
                    <p><span>Conditionnement:</span> {beer.details_beer?.conditionnement}</p>
                    <p><span>Contenance:</span> {beer.details_beer?.contenance} cl</p>
                    <p><span>Amertume:</span> {beer.details_beer?.amertume ?? 'Non spécifié'}/5</p>
                    <p><span>Douceur:</span> {beer.details_beer?.douceur ?? 'Non spécifié'}/5</p>
                    <p><span>Fruité:</span> {beer.details_beer?.fruite ?? 'Non spécifié'}/5</p>
                    <p><span>IBU:</span> {beer.details_beer?.ibu}</p>
                    <p><span>EBC:</span> {beer.details_beer?.ebc}</p>
                    <p><span>Brasseur : </span> 
                        <Link to={`/breweries/${beer.brewery.id}`} className="name-brewery">
                            {beer.brewery.name}
                        </Link>
                    </p>
                    {auth?.user?.role === 'admin' && (
                        <div className="d-flex mt-3">
                            <Link to={`/beers/${beer.id}/edit`} className="btn btn-three">Modifier</Link>
                            <button onClick={handleDelete} className="btn btn-danger ml-3">Supprimer</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default BeerDetails;