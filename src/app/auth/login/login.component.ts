import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAuthorizationToken();
    this.initForm(); // initialize reactive form on component init
  }

  getAuthorizationToken() {
    console.log('im in geth auth');
    if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
      console.log('i am in get auth again');
      this.auth.getAuthorizationToken().subscribe(
        data => {
          console.log(data);
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
      username: [null, Validators.compose([Validators.required])]
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
        if (data.responseCode === '00' && data.responseMessage === 'SUCCESS;') {
          localStorage.setItem('user', JSON.stringify(data.responseObject));
          this.toastr.success(`Welcome ${data.responseObject.emp_firstname} ${data.responseObject.emp_lastname}`, 'You are logged in!');
          this.router.navigate(['admin']);
        } else if (data.responseCode === '99' && data.responseMessage === 'FAILED;') {
          this.loginError = {
                              status: true,
                              message: 'Invalid Username or Password'
                            };
        }
      },
      error => {
        console.log(error);
        if (error.status === 422) {
          this.loginError = {
                              status: true,
                              message: error.error.message
                            };
        } else if (error.status === 403) {
          this.loginError = {
                              status: true,
                              message: 'Invalid Username or Password'
                            };
        } else {
          this.loginError = {
                              status: true,
                              message: error.error.error
                            };
        }
      }
    );
  }

}

