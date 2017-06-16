import {Injectable} from '@angular/core';
import {User} from '../user/user.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { URLProviderService } from "../URLProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Injectable()
export class UserListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService, private localStorageService: LocalStorageService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/AppUsers");
    }

    update(u: User): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(this.urlProviderService.getURL() + `api/AppUsers/${u.Id}`, JSON.stringify(u),opts).map(res => res.json());
    }
}