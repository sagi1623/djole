import { SearchParams } from "../search-accommodation/searchParams.model";
import {Injectable} from '@angular/core';

@Injectable()
export class ODataQueryBuilderService {

    constructor() {}

    generateQuery(searchParams:SearchParams):string 
    {
        let searchPattern= "";

        if (searchParams.Name != "")
        {                 
            searchPattern += `filter=Name eq '${searchParams.Name}'`;
        }

        if (searchParams.Country != "")
        {
          if (searchPattern !="")
          {
            searchPattern += " and ";
          }
          else
          {
            searchPattern += `filter=`;
          }
          searchPattern += `Place/Region/Country/Name eq '${searchParams.Country}'`;
        }

        if (searchParams.Region != "")
        {
          if (searchPattern !="")
          {
            searchPattern += " and ";
          }
          else
          {
            searchPattern += `filter=`;
          }
          searchPattern += `Place/Region/Name eq '${searchParams.Region}'`;
        }
    
        if (searchParams.Place != "")
        {
          if (searchPattern !="")
          {
            searchPattern += " and ";
          }
          else
          {
            searchPattern += `filter=`;
          }
          searchPattern += `Place/Name eq '${searchParams.Place}'`;
        }

        if (searchParams.AccommodationType != "")
        {
          if (searchPattern !="")
          {
            searchPattern += " and ";
          }
          else
          {
            searchPattern += `filter=`;
          }
          searchPattern += `AccommodationType/Name eq '${searchParams.AccommodationType}'`;
        }

        if (searchParams.BedCount)
        {
          if (searchPattern !="")
          {
            searchPattern += " and ";
          }
          else
          {
            searchPattern += `filter=`;
          }
          searchPattern += `Rooms/any(r: r/BedCount ge ${searchParams.BedCount})`;
        }

        if (searchParams.Grade)
        {
          if (searchPattern !="")
          {
            searchPattern += " and ";
          }
          else
          {
            searchPattern += `filter=`;
          }
          searchPattern += `AverageGrade ge ${searchParams.Grade}`;
        }

        if (searchParams.PriceMin || searchParams.PriceMax)
        {
          let min = Number.MIN_VALUE;
          let max = Number.MAX_VALUE;
          if(searchParams.PriceMin)
          {
            min = searchParams.PriceMin;
          }

          if(searchParams.PriceMax)
          {
            max = searchParams.PriceMax;
          }

          if (searchPattern !="")
          {
            searchPattern += " and ";
          }
          else
          {
            searchPattern += `filter=`;
          }
          searchPattern += `Rooms/any(r: r/PricePerNight ge ${min} and r/PricePerNight le ${max})`;
        }

        if(searchPattern != "")
        {
          searchPattern = '?$inlinecount=allpages' + searchPattern; 
        }
        else
        {
           searchPattern = '?$inlinecount=allpages';
        }

        searchPattern += `&$top=${searchParams.pageSize}`;
        searchPattern += `&$skip=${searchParams.skip}`;

        return searchPattern;
    }

}