import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;

  ValidationMessages = {
    firstName: {
      required: 'First Name is required',
      minlength: 'Must be 2 characters',
      maxlength: 'Must be less than 10 characters'
    },
    lastName: {
      required: 'First Name is required',
      minlength: 'Must be 2 characters',
      maxlength: 'Must be less than 10 characters'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    });
  }
}
