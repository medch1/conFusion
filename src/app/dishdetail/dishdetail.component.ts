import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import {Params,ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DishService} from "../services/dish.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish | undefined;
  dishIds: string[] | undefined;
  prev: string | undefined;
  next: string | undefined;
  constructor(private route:ActivatedRoute,
              private dishService:DishService,
              private  location:Location) { }


  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getdish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }
  setPrevNext(dishId:string|undefined) {
    if (dishId != null) {
      const index = this.dishIds?.indexOf(dishId);

      this.prev = this.dishIds?.[(this.dishIds?.length + index! - 1) % this.dishIds?.length];
      this.next = this.dishIds?.[(this.dishIds?.length + index! + 1) % this.dishIds?.length];
    }
  }


  goBack():void{
this.location.back();
  }

}
