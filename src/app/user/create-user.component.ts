import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { HttpClient } from '@angular/common/http';

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
      emailDomain: 'Email domain must be gmail.com'
    },
    confirmEmail: {
      required: 'Confirm Email is required',
    },
    emailGroup: {
      emailMismatch: 'Email and confirm email do not match'
    },
  };

  formErrors = {
  };

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email', Validators.required],
      phone: ['', Validators.required],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('gmail.com')]],
        confirmEmail: ['', Validators.required],
      }, {validator: matchEmail}),
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.userForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    this.userForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.userForm);
    });
  }

  onCreatePost(postData) {
    // console.log(postData);
    this.http.post('https://ng-complete-guide-8744f.firebaseio.com/posts.json', postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  AddSkillButtonClick(): void {
    ( this.userForm.get('skills') as FormArray).push(this.addSkillFormGroup());
  }

  removeSkillFormClick(skillIndex: number): void {
    ( this.userForm.get('skills') as FormArray).removeAt(skillIndex);
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
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
      const abstractControl = group.get(key);

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

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onClickLoadData(): void {
    this.logValidationErrors(this.userForm);
    console.log(this.formErrors);
  }
}

function matchEmail(group: AbstractControl): {[key: string]: any} | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value) {
    return null;
    } else {
      return { emailMismatch: true };
    }
}
