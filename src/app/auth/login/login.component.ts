import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginPayload } from 'src/app/core/models/IUser';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  payload: ILoginPayload;
  loginError: {status: boolean, message: string} = {status: false, message: ''};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getAuthorizationToken();
    this.initForm(); // initialize reactive form on component init
  }

  getAuthorizationToken() {
    console.log('runnin auth....');
    if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
      console.log('im inside runnin auth again lol....');
      this.auth.getAuthorizationToken().subscribe(
        data => {
          const keys = data.headers.keys();
          const headers = keys.map(key => `${key}: ${data.headers.get(key)}`);
          console.log(data);
          console.log(headers);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  // build form controls
  initForm(): void {
    this.form = this.fb.group({
      password: [null, Validators.required],
      username: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  get formData() {
    return this.form.controls;
  }

  onSubmit(formPayload) {
    if (this.loginError.status === true){
      this.loginError = {
                          status: false,
                          message: ''
                        };
    }
    this.payload = {
                    username: formPayload.username.value,
                    password: formPayload.password.value,
                   };
    console.log('payload: ', this.payload);
    this.login(this.payload);
  }

  login(payload: ILoginPayload) {
    this.auth.login(payload).subscribe(
      data => {
        console.log(data);
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
      },
      error => {
        // if (error.status === 422) {
        //   this.loginError = {
        //                       status: true,
        //                       message: error.error.message
        //                     };
        // } else {
        //   this.loginError = {
        //                       status: true,
        //                       message: error.error.message
        //                     };
        // }
      }
    );
  }

}

