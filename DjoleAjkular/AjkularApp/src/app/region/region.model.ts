import { Place } from "../place/place.model";
import { Country } from "../country/country.model";

export class Region {

    constructor(public Id: number, public Name:string, public Country: Country, public Places: Place[], public CountryId?: number)
    {
    }

}