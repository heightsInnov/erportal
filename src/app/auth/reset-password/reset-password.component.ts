import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IResetPayload } from 'src/app/core/models/IUser';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  payload: IResetPayload;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm(); // initialize reactive form on component init
  }

  // build form controls
  initForm(): void {
    this.form = this.fb.group({
      password: [null, Validators.required],
      new_password: [null, Validators.required],
      username: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  get formData() {
    return this.form.controls;
  }

  onSubmit(formPayload) {
    this.payload = {
                    username: formPayload.username.value,
                    password: formPayload.password.value,
                    new_password: formPayload.new_password.value
                    };
    console.log('payload: ', this.payload);
  }

  resetPassword(payload: IResetPayload) {
    this.auth.resetPassword(payload).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
