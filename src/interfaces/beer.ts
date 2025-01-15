import { Brewery } from "./brewery";
import { DetailsBeer } from "./details_beer";

export interface Beer {
    id: number;
    name: string;
    type: string;
    alcool_pourcent: number;
    details_beer: DetailsBeer;
    brewery: Brewery;
}
