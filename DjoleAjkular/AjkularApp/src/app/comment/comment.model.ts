import { Accommodation } from "../accommodation/accommodation.model";
import { User } from "../user/user.model";

export class Comment {

    constructor(public Grade?: number, public Text?:string, public Accommodation?: Accommodation, public AccommodationId?: number, public CustomerId?: number, public Customer?: User)
    {
        this.Customer = new User();
    }

}