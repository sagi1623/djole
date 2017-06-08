import {Injectable} from '@angular/core';
import {Place} from '../place/place.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PlaceListService 
{

    constructor(private http:Http)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get("http://localhost:54042/api/Places");      
    }

    getById(id: number): Observable<any>
    {
        return this.http.get(`http://localhost:54042/api/Places/${id}`,id);
    }

    create(p : Place): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post("http://localhost:54042/api/Places", JSON.stringify(p),opts);
    }

}