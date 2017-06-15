import {Injectable} from '@angular/core';
import {Accommodation} from '../accommodation/accommodation.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLProviderService } from "../URLProvider.service";
import { LocalStorageService } from "../localStorage.service";
import { SearchParams } from "../search-accommodation/searchParams.model";
import { ODataQueryBuilderService } from "../search-accommodation/oDataQueryBuilder.service";

@Injectable()
export class AccommodationListService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService, private localStorageService: LocalStorageService, private odataQueryBuilderService: ODataQueryBuilderService)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Accommodations");      
    }

    getAllApproved(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Accommodations?$filter=Approved eq true");      
    }

    getAllUnapproved(): Observable<any>
    {
       return this.http.get(this.urlProviderService.getURL() + "api/Accommodations?$filter=Approved eq false");      
    }

    getById(id: number): Observable<any>
    {
        //return this.http.get(this.urlProviderService.getURL() + `api/Accommodations/${id}`);
        return this.http.get(this.urlProviderService.getURL() + `api/Accommodations?$filter=Id eq ${id} &$expand=Rooms,Comments`).map(res => res.json());
    }

    create(a : Accommodation, file: File): Observable<any>
    {
        // let header = new Headers();
        // header.append('Accept', 'application/json');
        // header.append('Content-type','application/json');
        // header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));
        
        // let opts = new RequestOptions();
        // opts.headers = header;

        console.log(a);
        let formData:FormData = new FormData();
        formData.append('a', JSON.stringify(a));
        formData.append('uploadFile', file, file.name);
        console.log(formData);
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');

        headers.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));
        
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

       //return this.http.post(this.urlProviderService.getURL() + "api/Accommodations", JSON.stringify(a),opts).map(res => res.json());
       return this.http.post(this.urlProviderService.getURL() + "api/Accommodations",formData,options).map(res => res.json());
}

    update(a: Accommodation): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.put(this.urlProviderService.getURL() + `api/Accommodations/${a.Id}`, JSON.stringify(a),opts);
    }

    delete(id: number): Observable<any>
    {
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + this.localStorageService.get('token'));

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.delete(this.urlProviderService.getURL() + `api/Accommodations/${id}`, opts);
    }

    search(searchParams: SearchParams): Observable<any>
    {
        let searchPattern = this.odataQueryBuilderService.generateQuery(searchParams);
        return this.http.get(this.urlProviderService.getURL() + "api/Accommodations" + searchPattern).map(res => res.json());   
    }

}