import { Injectable } from '@angular/core';
import {LEADERS} from "../shared/leaders";
import {Leader} from "../shared/leader";
import {DISHES} from "../shared/dishes";
import {catchError, delay, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
import {baseURL} from "../shared/baseurl";


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
              private processHTTPMsgService:ProcessHTTPMsgService) { }

  getLeaders():Observable <Leader[]> {
    /*return of(LEADERS).pipe(delay( 2000));*/
    return this.http.get<Leader[]>(baseURL+'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader():Observable<Leader> {

    return this.http.get<Leader>(baseURL+'leadership?featured=true')
      .pipe(map(leaders=>leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));

}

}
