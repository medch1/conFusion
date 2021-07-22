import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import {Params,ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DishService} from "../services/dish.service";
import {switchMap} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {




  commentaire: Comment = new Comment();
  commentForm: FormGroup = new FormGroup({
    author: new FormControl(),
    srating: new FormControl(),
    comment: new FormControl()});
  @ViewChild('cform') commentFormDirective:any;

  formErrors:any={
    'author':'',
    'comment':''
  };

  validationMessages:any ={
    'author':{
      'required':'First name is required.',
      'minlength':'First name must be at least 2 characters long'
    },
    'comment:':{
      'required':'Comment is required.'
    }


  };

  dish: Dish | undefined;
  errMess: string | undefined;
  dishIds: string[] | undefined;
  prev: string | undefined;
  next: string | undefined;
  constructor(private route:ActivatedRoute,
              private dishService:DishService,
              private  location:Location,
              private  fb:FormBuilder,
              @Inject('BaseURL')public BaseURL:any) {
    this.createForm();
  }


  dater:string = new Date().toString();
  get author() {
    return (this.commentForm.get('author')?.value);
  }
  get comment() {
    return (this.commentForm.get('comment')?.value);
  }
  get srating(){
    return (this.commentForm.get('srating')?.value);
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getdish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
        errmess=>this.errMess=<any> errmess);
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

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required,Validators.minLength(2) ]],
      comment: ['', [Validators.required]],
      srating: ''
    });
    this.commentForm.valueChanges
      .subscribe(data =>this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?:any){
    if(!this.commentForm) {
      return;
    }
    const form=this.commentForm;
    for (const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid ) {
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }




  onSubmit() {
   /* = this.commentForm.value*/

    //this.dish?.comments.push( this.srating,this.comment,this.author,this.dater)
  this.dish?.comments?.push({rating:this.srating,
    comment:this.comment,
  author:this.author,
  date:this.dater})
    this.commentForm.reset({
      author: '',
      comment:'',
      srating:this.formatLabel(5)

    });
  }
  formatLabel(value: number) {
    return value;
  }
}
