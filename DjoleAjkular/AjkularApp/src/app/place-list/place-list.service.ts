import {Injectable} from '@angular/core';
import {Place} from '../place/place.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { URLProviderService } from "../URLProvider.service";


@Injectable()
export class PlaceListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Places");      
    }

    getById(id: number): Observable<any>
    {
        //return this.http.get(`http://localhost:54042/api/Places/${id}`);
        return this.http.get(this.urlProviderService.getURL() + `api/Places?$filter=Id eq ${id} &$expand=Accommodations`).map(res => res.json());
    }

    create(p : Place): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(this.urlProviderService.getURL() + "api/Places", JSON.stringify(p),opts);
    }

    update(p: Place): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(this.urlProviderService.getURL() + `api/Places/${p.Id}`,JSON.stringify(p),opts);
    }

    delete(id: number): Observable<any>
    {
          return this.http.delete(this.urlProviderService.getURL() + `api/Places/${id}`);
    }

}