import {Injectable} from '@angular/core';
import { LocalStorageService } from "./localStorage.service";

@Injectable()
export class UserStatusProviderService {

    constructor(private localStorageService: LocalStorageService) {}

    isUserLoggedIn():boolean 
    {
      return this.localStorageService.exists('token');
    }

    isUserAdmin():boolean
    {
        return (this.localStorageService.get('role') === 'Admin' )
    }
    
    isUserManager():boolean
    {
        return (this.localStorageService.get('role') === 'Manager' )
    }

    isUserUser():boolean
    {
        return (this.localStorageService.get('role') === 'User' )
    }
}