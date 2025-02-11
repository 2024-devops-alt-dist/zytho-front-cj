import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/styles/Global.css';
import { AuthContext } from '../../context/AuthContext';
import { Beer } from '../../interfaces/beer';
import { getBeerDetails, updateBeer } from '../../services/api';

const BeerEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [beer, setBeer] = useState<Beer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useContext(AuthContext); 

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (beer) {
            try {
                await updateBeer(beer.id, beer);
                navigate(`/beers/${beer.id}`);
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la bière:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (beer) {
            setBeer({
                ...beer,
                [e.target.name]: e.target.value
            });
        }
    };

    if (loading) {
        return <p>Chargement du formulaire...</p>;
    }

    if (!beer) {
        return <p>Aucune bière trouvée.</p>;
    }

    return (
        <div className="beer-edit-form">
            <h2>Modifier la bière: {beer.name}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom de la bière</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={beer.name} 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Alcool</label>
                    <input 
                        type="number" 
                        name="alcool_pourcent" 
                        value={beer.alcool_pourcent} 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Type</label>
                    <input 
                        type="text" 
                        name="type" 
                        value={beer.type} 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        name="description" 
                        value={beer.details_beer?.description || ''} 
                        onChange={(e) => setBeer({
                            ...beer,
                            details_beer: {
                                ...beer.details_beer,
                                description: e.target.value
                            }
                        })}
                    />
                </div>
                {/* Ajoutez d'autres champs à modifier selon vos besoins */}
                <button type="submit">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default BeerEdit;
