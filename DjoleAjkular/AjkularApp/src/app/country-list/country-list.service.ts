import {Injectable} from '@angular/core';
import {Country} from '../country/country.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CountryListService 
{

    constructor(private http:Http)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get("http://localhost:54042/api/Countries");      
    }

    getById(id: number): Observable<any>
    {
        return this.http.get(`http://localhost:54042/api/Countries/${id}?$expand = Regions`);
    }

    create(c : Country): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post("http://localhost:54042/api/Countries", JSON.stringify(c),opts);
    }

    update(c: Country): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(`http://localhost:54042/api/Countries/${c.Id}`,JSON.stringify(c),opts);
    }

    delete(id: number): Observable<any>
    {
          return this.http.delete(`http://localhost:54042/api/Countries/${id}`);
    }


}