import { Accommodation } from "../accommodation/accommodation.model";
import { AppUser } from "../app-user/app-user.model";

export class Comment {

    constructor(public Grade?: number, public Text?:string, public Accommodation?: Accommodation, public AccommodationId?: number, public AppUserId?: number, public User?: AppUser)
    {
        this.User = new AppUser();
    }

}