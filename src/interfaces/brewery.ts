import { Beer } from "./beer";

export interface Brewery {
    id: number;
    name: string;
    address: string;
    country: string;
    description?: string;
    schedules?: string;
    url_social_media?: string;
    beers?: Beer[];
}