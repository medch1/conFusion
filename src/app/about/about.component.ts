import {Component, Inject, OnInit} from '@angular/core';
import {Leader} from "../shared/leader";
import {LeaderService} from "../services/leader.service";
import {expand, flyInOut} from "../animations/app.animation";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]':'true' ,
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[] | undefined ;



  constructor(private  leaderservice:LeaderService,
              @Inject('BaseURL')public BaseURL:any) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leader =>this.leaders=leader);
  }
}
