import {Injectable} from '@angular/core';
import {Country} from '../country/country.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLProviderService } from "../URLProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Injectable()
export class CountryListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService, private localStorageService: LocalStorageService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Countries");      
    }

    getById(id: number): Observable<any>
    {
        return this.http.get(this.urlProviderService.getURL() + `api/Countries?$filter=Id eq ${id} &$expand=Regions`).map(res => res.json());
    }

    create(c : Country): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');      
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(this.urlProviderService.getURL() + "api/Countries", JSON.stringify(c),opts).map(res => res.json());
    }

    update(c: Country): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(this.urlProviderService.getURL() + `api/Countries/${c.Id}`,JSON.stringify(c),opts);
    }

    delete(id: number): Observable<any>
    {
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;
        
        return this.http.delete(this.urlProviderService.getURL() + `api/Countries/${id}`, opts);
    }
}