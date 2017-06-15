import {Injectable} from '@angular/core';
import {Comment} from '../comment/comment.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { URLProviderService } from "../URLProvider.service";
import { LocalStorageService } from "../localStorage.service";


@Injectable()
export class CommentListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService, private localStorageService: LocalStorageService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Comments");      
    }

    getById(accId: number, appId: number): Observable<any>
    {
        //return this.http.get(this.urlProviderService.getURL() + `api/Comments/${accId}/${appId}`).map(res => res.json());
        return this.http.get(this.urlProviderService.getURL() + `api/Comments?$filter=AccommodationId eq ${accId} and AppUserId eq ${appId} &$expand=AppUser`).map(res => res.json());
    }

    create(c : Comment): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post(this.urlProviderService.getURL() + "api/Comments", JSON.stringify(c),opts).map(res => res.json());
    }

    // update(c: Comment): Observable<any>
    // {
    //     let header = new Headers();
    //     header.append('Accept', 'application/json');
    //     header.append('Content-type','application/json');
        
    //     let opts = new RequestOptions();
    //     opts.headers = header;

    //    return this.http.put(`http://localhost:54042/api/Comments/${c.Id}`,JSON.stringify(c),opts);
    // }

    delete(accId: number, appId: number): Observable<any>
    {
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(this.urlProviderService.getURL() + `api/Comments/${accId}/${appId}`, opts);
    }

}