export class RegistrationDTO {

    constructor(public FirstName: string, public LastName: string, public Email: string, public Password: string, public ConfirmPassword: string, public Role: string, public Banned: boolean)
    {
    }

}