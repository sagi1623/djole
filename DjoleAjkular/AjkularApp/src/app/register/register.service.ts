import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { RegistrationDTO } from "../register/registrationDTO.model";
import { URLProviderService } from "../URLProvider.service";


@Injectable()
export class RegisterService 
{
    constructor(private http:Http, private urlProviderService: URLProviderService)
    {
    }

    register(regDTO: RegistrationDTO): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;
        regDTO.Banned = false;
        return this.http.post(this.urlProviderService.getURL() + "api/Account/Register", JSON.stringify(regDTO),opts); 
    }
}