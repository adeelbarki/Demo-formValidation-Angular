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
      required: 'Last Name is required',
      minlength: 'Must be 2 characters',
      maxlength: 'Must be less than 10 characters'
    },
    phone: {
      required: 'Phone number is required'
    },
    email: {
      required: 'Email is required',
    },
    confirmEmail: {
      required: 'Confirm Email is required',
    },
    skillName: {
      required: 'Skill name is required',
    },
    experienceInYears: {
      required: 'Experience is required'
    },
    proficiency: {
      required: 'Proficiency is required'
    }
  };

  formErrors = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    confirmEmail: '',
    skillName: '',
    experienceInYears: '',
    proficiency: '',
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      confirmEmail: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });

    this.userForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    this.userForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.userForm);
    });
  }

  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.userForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.userForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key)
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid &&
            (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.ValidationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }
    });
  }

  onClickLoadData(): void {
    this.logValidationErrors(this.userForm);
    console.log(this.formErrors);
  }
}
