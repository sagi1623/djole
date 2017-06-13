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
export class AccommodationListODataService 
{

    constructor(private http:Http, private urlProviderService: URLProviderService, private localStorageService: LocalStorageService, private odataQueryBuilderService: ODataQueryBuilderService)
    {
    }

    search(searchParams: SearchParams): Observable<any>
    {
        let searchPattern = this.odataQueryBuilderService.generateQuery(searchParams);
        return this.http.get(this.urlProviderService.getURL() + "odata/AccommodationOData" + searchPattern).map(res => res.json());   
    }

}