import axios from 'axios';
import { Beer } from '../interfaces/beer';
import { Brewery } from '../interfaces/brewery';
import { Users } from '../interfaces/users';
import { DetailsBeer } from '../interfaces/details_beer';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', 
});

export const getBeers = () => api.get<Beer[]>('/beers');
export const getBeerDetails = (id: number) => api.get<Beer>(`/beers/${id}`);
export const updateBeer = async (id: number, data: Partial<Beer>) => {
    return api.put(`/beers/${id}`, data);
};
export const updateBeerDetails = (id: number | undefined, data: Partial<DetailsBeer>) => {
    if (!id) {
        throw new Error('ID des détails de la bière manquant');
    }
    return api.put(`/details_beer/${id}`, data);
};
export const getBrewery = () => api.get<Brewery[]>(`/breweries`);
export const getBreweryDetails = (id: number) => api.get<Brewery>(`/breweries/${id}`);
export const addUser = () => api.post<Users[]>('/users');


// export const deleteBeer = (id: number) => {
//     console.log(`Appel API pour supprimer la bière avec l'ID : ${id}`); // Log pour vérifier l'ID passé
//     return api.delete(`/beers/${id}`);
// };

// export const deleteBeerDetails = (id: number) => {
//     console.log(`Appel API pour supprimer les détails de la bière avec l'ID : ${id}`); // Log pour vérifier l'ID passé
//     return api.delete(`/details_beer/${id}`);
// };