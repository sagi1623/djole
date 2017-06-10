import {Injectable} from '@angular/core';
import {AccommodationType} from '../accommodationtype/accommodationtype.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AccommodationTypeListService 
{

    constructor(private http:Http)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get("http://localhost:54042/api/AccommodationTypes");      
    }

    getById(id: number): Observable<any>
    {
        //return this.http.get(`http://localhost:54042/api/AccommodationTypes/${id}`);
        return this.http.get(`http://localhost:54042/api/AccommodationTypes?$filter=Id eq ${id} &$expand=Accommodations`).map(res => res.json());
    }

    create(at : AccommodationType): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post("http://localhost:54042/api/AccommodationTypes", JSON.stringify(at),opts);
    }

    update(at: AccommodationType): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(`http://localhost:54042/api/AccommodationTypes/${at.Id}`, JSON.stringify(at),opts);
    }

    delete(id: number): Observable<any>
    {
        return this.http.delete(`http://localhost:54042/api/AccommodationTypes/${id}`);
    }

}