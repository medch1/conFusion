import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import {FeedbackService} from "../services/feedback.service";
import {expand, flyInOut} from "../animations/app.animation";




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true' ,
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand(),


  ]
}
)
export class ContactComponent implements OnInit {

  feedbackcopy:Feedback |any ;
  feedback: Feedback |any;
  contactType = ContactType;
  feedbackForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    telnum: new FormControl(),
    email: new FormControl(),
    agree: new FormControl(),
    contacttype: new FormControl(),
    message: new FormControl()});
  errMess: string | undefined;
  isloading=true;
  currentfeedback=false;
  @ViewChild('fform') feedbackFormDirective:any;

  formErrors:any={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessages:any ={
    'firstname':{
      'required':'First name is required.',
      'minlength':'First name must be at least 2 characters long',
      'maxlength':'First name cannot be more than 25 characters'
    },
    'lastname':{
      'required':'Last name is required.',
      'minlength':'Last name must be at least 2 characters long',
      'maxlength':'Last name cannot be more than 25 characters'
    },
    'telnum': {
      'required':'Tel. number is required.',
      'pattern':'Tel. number must contain only numbers.'
    },
    'email':{
      'required':'Email is required.',
      'email':'Email not in valid format.'

    }

  };

  constructor(private fb: FormBuilder,
              private feedbackService:FeedbackService,) {
    this.createForm();
  }


  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
      lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
      telnum: [0, [Validators.required,Validators.pattern ]],
      email: ['', [Validators.required,Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data =>this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.feedbackForm) {
      return;
    }
    const form=this.feedbackForm;
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
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.currentfeedback=true;
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback=>{

          this.feedbackcopy = feedback;
          this.feedback = null;
          this.isloading = false;
        setTimeout(() => {
          this.feedbackcopy = null; this.currentfeedback = false }, 5000);

      },
        errmess=>{this.feedback=null;this.feedbackcopy=null;this.errMess=<any>errmess;});

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }


}
