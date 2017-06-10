import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from "../localStorage.service";
import { URLProviderService } from "../URLProvider.service";

@Injectable()
export class LogOutService {

    constructor(private http: Http,private urlProviderService: URLProviderService, private localStorageService: LocalStorageService) {}

    logout() : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(this.urlProviderService.getURL() + `api/Account/Logout`, "", opts);
    }

}