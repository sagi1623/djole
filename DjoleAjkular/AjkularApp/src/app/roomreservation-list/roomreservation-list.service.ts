import {Injectable} from '@angular/core';
import {RoomReservation} from '../roomreservation/roomreservation.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { URLProviderService } from "../URLProvider.service";

@Injectable()
export class RoomReservationListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/RoomReservations");      
    }

    getById(id: number): Observable<any>
    {
        return this.http.get(this.urlProviderService.getURL() + `api/RoomReservations/${id}`);
    }

    create(rr : RoomReservation): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(this.urlProviderService.getURL() + "api/RoomReservations", JSON.stringify(rr),opts);
    }

    update(rr: RoomReservation): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(this.urlProviderService.getURL() + `api/RoomReservations/${rr.Id}`, JSON.stringify(rr),opts);
    }

    delete(id: number): Observable<any>
    {
        return this.http.delete(this.urlProviderService.getURL() + `api/RoomReservations/${id}`);
    }
}