import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  feedback: Feedback = new Feedback;
  contactType = ContactType;
  feedbackForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    telnum: new FormControl(),
    email: new FormControl(),
    agree: new FormControl(),
    contacttype: new FormControl(),
    message: new FormControl()});

  @ViewChild('fform') feedbackFormDirective:any;


  constructor(private fb: FormBuilder) {
    this.createForm();
  }


  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
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
