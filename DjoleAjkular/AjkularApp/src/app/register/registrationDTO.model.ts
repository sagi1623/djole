import { Place } from "../place/place.model";
import { Country } from "../country/country.model";

export class RegistrationDTO {

    constructor(public FirstName: string, public LastName: string, public Email: string, public Password: string, public ConfirmPassword:string)
    {
    }

}