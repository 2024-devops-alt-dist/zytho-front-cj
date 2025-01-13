import React, { useState, useEffect } from 'react';
import { getBeers } from '../services/api'; // Import de ton service
import { Beer } from '../interfaces/beer'; // Assure-toi d'avoir l'interface Beer dans un fichier séparé

const BeerList: React.FC = () => {
    const [beers, setBeers] = useState<Beer[]>([]); // État pour stocker les bières
    const [loading, setLoading] = useState<boolean>(true); // État pour gérer le chargement
    const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

    // Récupération des données depuis l'API
    useEffect(() => {
        const fetchBeers = async () => {
            try {
                const response = await getBeers();
                setBeers(response.data); // Mets à jour l'état avec les données de l'API
                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'Une erreur est survenue.');
                setLoading(false);
            }
        };

        fetchBeers();
    }, []);

    // Gestion du chargement ou des erreurs
    if (loading) return <p>Chargement des bières...</p>;
    if (error) return <p>Erreur : {error}</p>;

    // Affichage des bières
    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Liste des Bières Artisanales</h1>
            <div className="row justify-content-center">
                {beers.map((beer) => (
                    <div key={beer.id} className="col-12 col-md-4 mb-4 d-flex justify-content-center">
                        <div className="card h-100">
                            <img src={`path_to_images/${beer.id}.jpg`} alt={beer.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{beer.name}</h5>
                                <p className="card-text text-muted">{beer.type}</p>
                                <p className="card-text">{beer.alcool_pourcent}% alcool</p>
                                <p className="card-text">Brasserie : {beer.brewery_id}</p>
                                <a href={`/beers/${beer.id}`} className="btn btn-primary">Voir plus</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BeerList;



// const beers = [
    //     {
    //         id: 1,
    //         name: 'Pilsner Lager',
    //         alcool_pourcent: 4,
    //         type: 'Lager',
    //         origin: 'Czech Republic',
    //         image: 'src/assets/pictures/beersPicture1.jpg',
    //         description: 'A refreshing pilsner with a crisp finish.',
    //     },
    //     {
    //         id: 2,
    //         name: 'IPA West Coast',
    //         alcool_pourcent: 9,
    //         type: 'IPA',
    //         origin: 'USA',
    //         image: 'src/assets/pictures/beersPicture1.jpg',
    //         description: 'A bold IPA with hoppy bitterness and citrus aroma.',
    //     },
    //     {
    //         id: 3,
    //         name: 'Belgian Witbier',
    //         alcool_pourcent: 8,
    //         type: 'Witbier',
    //         origin: 'Belgium',
    //         image: 'src/assets/pictures/beersPicture1.jpg',
    //         description: 'A light and citrusy wheat beer with a smooth finish.',
    //     },
    //     {
    //         id: 4,
    //         name: 'Stout Dark',
    //         alcool_pourcent: 5,
    //         type: 'Stout',
    //         origin: 'Ireland',
    //         image: 'src/assets/pictures/beersPicture1.jpg',
    //         description: 'A rich, dark stout with coffee and chocolate notes.',
    //     },
    //     {
    //         id: 5,
    //         name: 'Saison Farmhouse',
    //         alcool_pourcent: 6,
    //         type: 'Saison',
    //         origin: 'Belgium',
    //         image: 'src/assets/pictures/beersPicture1.jpg',
    //         description: 'A farmhouse ale with a spicy, fruity flavor.',
    //     },
    //     {
    //         id: 6,
    //         name: 'Lager Gold',
    //         alcool_pourcent: 8,
    //         type: 'Lager',
    //         origin: 'Germany',
    //         image: 'src/assets/pictures/beersPicture1.jpg',
    //         description: 'A smooth lager with a hint of malt sweetness.',
    //     },
    // ];