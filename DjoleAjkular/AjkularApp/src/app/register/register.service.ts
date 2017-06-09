import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { RegistrationDTO } from "../register/registrationDTO.model";


@Injectable()
export class RegisterService 
{

    constructor(private http:Http)
    {
    }

    register(regDTO: RegistrationDTO): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;
        return this.http.post("http://localhost:54042/api/Account/Register", JSON.stringify(regDTO),opts); 
    }
}