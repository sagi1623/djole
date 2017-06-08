import {Injectable} from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AccommodationListService 
{

    constructor(private http:Http)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get("http://localhost:54042/api/Accommodations");      
    }

    getById(id: number): Observable<any>
    {
        return this.http.get(`http://localhost:54042/api/Accommodations/${id}`,id);
    }

    create(a : Accommodation): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post("http://localhost:54042/api/Accommodation", JSON.stringify(a),opts);
    }

}