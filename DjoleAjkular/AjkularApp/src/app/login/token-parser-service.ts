import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginDTO } from "../login/loginDTO.model";
import { LocalStorageService } from "../localStorage.service";

@Injectable()
export class TokenParserService {

    constructor(private http: Http, private localStorageService: LocalStorageService) {}

      parse(response: Response) : void {

        let response_json = response.json();
        let access_token = response_json['access_token'];
        console.log(access_token);      
        let role = response.headers.get('Role');
        console.log(role);
        let appUserID = response.headers.get('appUserID');
        console.log(appUserID);
        this.localStorageService.store('token',access_token);
        this.localStorageService.store('role',role);      
        this.localStorageService.store('appUserID',appUserID);     
    }

}