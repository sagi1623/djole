import {Injectable} from '@angular/core';
import {Region} from '../region/region.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class RegionListService 
{

    constructor(private http:Http)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get("http://localhost:54042/api/Regions");      
    }

    getById(id: number): Observable<any>
    {
       // return this.http.get(`http://localhost:54042/api/Regions/${id}`);
        return this.http.get(`http://localhost:54042/api/Regions?$filter=Id eq ${id} &$expand=Places`).map(res => res.json());
    }

    create(r : Region): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post("http://localhost:54042/api/Regions", JSON.stringify(r),opts);
    }

    update(r: Region): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(`http://localhost:54042/api/Places/${r.Id}`,JSON.stringify(r),opts);
    }

    delete(id: number): Observable<any>
    {
          return this.http.delete(`http://localhost:54042/api/Regions/${id}`);
    }

}