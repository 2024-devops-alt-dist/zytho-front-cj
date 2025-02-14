import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/styles/Global.css';
import '../../assets/styles/crud/BeerEdit.css';
import { AuthContext } from '../../context/AuthContext';
import { Beer } from '../../interfaces/beer';
import { getBeerDetails, updateBeer, updateBeerDetails } from '../../services/api';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setBeer((prevBeer) => {
            if (!prevBeer) return prevBeer;

            if (name.startsWith("details_beer.")) {
                const detailKey = name.split(".")[1];
                return {
                    ...prevBeer,
                    details_beer: {
                        ...prevBeer.details_beer,
                        [detailKey]: value,
                    },
                };
            }

            return {
                ...prevBeer,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!beer) return;
    
        // Màj beer
        const beerUpdateData = {
            id: beer.id,
            name: beer.name,
            type: beer.type,
            alcool_pourcent: beer.alcool_pourcent,
            brewery: beer.brewery,
        };
    
        // Màj detail_beer
        const detailsBeerUpdateData = {
            id: beer.details_beer?.id,
            amertume: beer.details_beer?.amertume,
            color: beer.details_beer?.color,
            conditionnement: beer.details_beer?.conditionnement,
            contenance: beer.details_beer?.contenance,
            description: beer.details_beer?.description,
            douceur: beer.details_beer?.douceur,
            ebc: beer.details_beer?.ebc,
            fermentation: beer.details_beer?.fermentation,
            fruite: beer.details_beer?.fruite,
            ibu: beer.details_beer?.ibu,
            pays: beer.details_beer?.pays,
        };
    
        try {
            await updateBeer(beer.id, beerUpdateData);
            await updateBeerDetails(beer.details_beer?.id, detailsBeerUpdateData);
    
            alert('Votre bière a été mis à jour avec succès !');
            
            // Utiliser navigate après un délai pour s'assurer que l'update est terminé
            setTimeout(() => {
                navigate(`/beers/${beer.id}`);
            }, 500);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la bière et de ses détails :', error);
        }
    };
    
    if (loading) {
        return <p>Chargement du formulaire...</p>;
    }

    if (!beer) {
        return <p>Aucune bière trouvée.</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="my-5 pb-3 text-center">Modifier la bière : {beer.name}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Nom de la bière :</label>
                        <input type="text" className="form-control" name="name" value={beer.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Alcool (%) :</label>
                        <input type="number" className="form-control" name="alcool_pourcent" value={beer.alcool_pourcent} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Type :</label>
                        <input type="text" className="form-control" name="type" value={beer.type} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Origine :</label>
                        <input type="text" className="form-control" name="details_beer.pays" value={beer.details_beer?.pays || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description :</label>
                    <textarea className="form-control" name="details_beer.description" value={beer.details_beer?.description || ''} onChange={handleChange} rows={5}></textarea>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Conditionnement :</label>
                        <input type="text" className="form-control" name="details_beer.conditionnement" value={beer.details_beer?.conditionnement || ''} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Contenance (ml) :</label>
                        <input type="number" className="form-control" name="details_beer.contenance" value={beer.details_beer?.contenance || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <label className="form-label">Amertume :</label>
                        <input type="number" className="form-control" name="details_beer.amertume" value={beer.details_beer?.amertume || ''} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Douceur :</label>
                        <input type="number" className="form-control" name="details_beer.douceur" value={beer.details_beer?.douceur || ''} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Fruité :</label>
                        <input type="number" className="form-control" name="details_beer.fruite" value={beer.details_beer?.fruite || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">IBU :</label>
                        <input type="number" className="form-control" name="details_beer.ibu" value={beer.details_beer?.ibu || ''} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">EBC :</label>
                        <input type="number" className="form-control" name="details_beer.ebc" value={beer.details_beer?.ebc || ''} onChange={handleChange} />
                    </div>
                </div>

                <button type="submit" className="btn btn-three mt-4 mb-5">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default BeerEdit;
