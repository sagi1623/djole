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
        return this.http.get(`http://localhost:54042/api/Regions/${id}`,id);
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

}