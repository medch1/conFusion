import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import {catchError, delay, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
import {baseURL} from "../shared/baseurl";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
              private processHTTPMsgService:ProcessHTTPMsgService) { }




  getPromotions():Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string):Observable<Promotion> {
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  };

  getFeaturedPromotion():Observable <Promotion> {
    /*
    return of(PROMOTIONS.filter((promotion) => (promotion.featured))[0]).pipe(delay (2000));*/
    return this.http.get<Promotion>(baseURL+'promotions?featured=true')
      .pipe(map(promotions=>promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  };
}

