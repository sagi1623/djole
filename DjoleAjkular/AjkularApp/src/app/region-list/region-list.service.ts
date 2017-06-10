import {Injectable} from '@angular/core';
import {Region} from '../region/region.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { URLProviderService } from "../URLProvider.service";


@Injectable()
export class RegionListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Regions");      
    }

    getById(id: number): Observable<any>
    {
       // return this.http.get(`http://localhost:54042/api/Regions/${id}`);
        return this.http.get(this.urlProviderService.getURL() + `api/Regions?$filter=Id eq ${id} &$expand=Places`).map(res => res.json());
    }

    create(r : Region): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(this.urlProviderService.getURL() + "api/Regions", JSON.stringify(r),opts);
    }

    update(r: Region): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(this.urlProviderService.getURL() + `api/Places/${r.Id}`,JSON.stringify(r),opts);
    }

    delete(id: number): Observable<any>
    {
          return this.http.delete(this.urlProviderService.getURL() + `api/Regions/${id}`);
    }

}