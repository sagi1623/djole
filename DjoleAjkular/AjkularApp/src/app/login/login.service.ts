import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginDTO } from "../login/loginDTO.model";
import { URLProviderService } from "../URLProvider.service";

@Injectable()
export class LoginService {

    constructor(private http: Http, private urlProviderService: URLProviderService) {}

    login(loginDTO: LoginDTO) : Observable<any> {
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');

        let options = new RequestOptions();
        options.headers = header;
        
        let data = `username=${loginDTO.Username}&password=${loginDTO.Password}&grant_type=password`;

        return this.http.post(this.urlProviderService.getURL() + `oauth/token`, data, options);
    }

}