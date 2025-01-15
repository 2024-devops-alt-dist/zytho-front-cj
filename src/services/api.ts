import axios from 'axios';
import { Beer } from '../interfaces/beer';
import { Brewery } from '../interfaces/brewery';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', 
});

export const getBeers = () => api.get<Beer[]>('/beers');
export const getBeerDetails = (id: number) => api.get<Beer>(`/beers/${id}`);
export const getBrewery = () => api.get<Brewery[]>(`/breweries`);
export const getBreweryDetails = (id: number) => api.get<Brewery>(`/breweries/${id}`);
