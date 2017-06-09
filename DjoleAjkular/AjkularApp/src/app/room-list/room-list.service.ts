import {Injectable} from '@angular/core';
import {Room} from '../room/room.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class RoomListService 
{

    constructor(private http:Http)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get("http://localhost:54042/api/Rooms");      
    }

    getById(id: number): Observable<any>
    {
        return this.http.get(`http://localhost:54042/api/Rooms/${id}`);
    }

    create(r : Room): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post("http://localhost:54042/api/Rooms", JSON.stringify(r),opts);
    }

    update(r: Room): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(`http://localhost:54042/api/Rooms/${r.Id}`, JSON.stringify(r),opts);
    }

    delete(id: number): Observable<any>
    {
        return this.http.delete(`http://localhost:54042/api/Rooms/${id}`);
    }
}