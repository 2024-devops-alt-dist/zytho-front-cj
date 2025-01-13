import axios from 'axios';
import { Beer } from '../interfaces/beer';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/', 
});

export const getBeers = () => api.get<Beer[]>('/beers'); 
// export const getBeerDetails = (id: string) => api.get<Beer>(`/beers/${id}`);
// export const getBreweries = () => api.get('/breweries');
// export const getBreweryDetails = (id: string) => api.get(`/breweries/${id}`);
