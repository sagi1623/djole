import {Injectable} from '@angular/core';
import {Room} from '../room/room.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLProviderService } from "../URLProvider.service";
import { LocalStorageService } from "../localStorage.service";

@Injectable()
export class RoomListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService, private localStorageService: LocalStorageService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Rooms");      
    }

    getById(id: number): Observable<any>
    {
        //return this.http.get(`http://localhost:54042/api/Rooms/${id}`);
        return this.http.get(this.urlProviderService.getURL() + `api/Rooms?$filter=Id eq ${id} &$expand=RoomReservations`).map(res => res.json());
    }

    create(r : Room): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(this.urlProviderService.getURL() + "api/Rooms", JSON.stringify(r),opts).map(res => res.json());
    }

    update(r: Room): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(this.urlProviderService.getURL() + `api/Rooms/${r.Id}`, JSON.stringify(r),opts);
    }

    delete(id: number): Observable<any>
    {
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(this.urlProviderService.getURL() + `api/Rooms/${id}`, opts);
    }
}