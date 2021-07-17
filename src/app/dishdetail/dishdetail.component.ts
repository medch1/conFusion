import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import {Params,ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DishService} from "../services/dish.service";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish | undefined;
  constructor(private route:ActivatedRoute,
              private dishService:DishService,
              private  location:Location) { }

  ngOnInit(): void {
    const id=this.route.snapshot.params['id'];
    this.dishService.getdish(id)
      .subscribe(dish=>this.dish=dish);
  }
  goBack():void{
this.location.back();
  }

}
