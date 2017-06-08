import {Injectable} from '@angular/core';
import {Comment} from '../comment/comment.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CommentListService 
{

    constructor(private http:Http)
    {
    }

    getAll(): Observable<any>
    {
       return this.http.get("http://localhost:54042/api/Comments");      
    }

    getById(id: number): Observable<any>
    {
        return this.http.get(`http://localhost:54042/api/Comments/${id}`,id);
    }

    create(c : Comment): Observable<any>
    {
        let header = new Headers();
        header.append('Accept', 'application/json');
        header.append('Content-type','application/json');
        
        let opts = new RequestOptions();
        opts.headers = header;

       return this.http.post("http://localhost:54042/api/Comments", JSON.stringify(c),opts);
    }

}