import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILoginPayload, IUserProfile } from 'src/app/core/models/IUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  payload: ILoginPayload;
  loginError: {status: boolean, message: string} = {status: false, message: ''};
  logo = {url: '../../../assets/images/lagos_logo.png'};
  loggedIn: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAuthorizationToken();
    this.initForm(); // initialize reactive form on component init
  }

  getAuthorizationToken() {
    console.log('im in geth auth');
    this.auth.checkLogin.subscribe(
      login => {
        this.loggedIn = login;
        if (this.loggedIn === 'true') {
          const token = localStorage.getItem('jwt');
          const userDetails: IUserProfile = JSON.parse(localStorage.getItem('user'));
          if (token !== null && this.instanceOfUserDetails(userDetails)) {
            this.router.navigate(['/admin']);
          } else {
            this.auth.changeLoginState('false');
            localStorage.clear();
            this.auth.getAuthorizationToken().subscribe(
              data => {
                console.log(data);
              },
              error => {
                console.log(error);
                this.toastr.error(`${error}`);
              }
            );
          }
        } else if (this.loggedIn === 'false') {
          localStorage.clear();
          console.log('not logged in.. gettin token');
          this.auth.getAuthorizationToken().subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
              this.toastr.error(`${error.message}`);
            }
          );
        }
      }
    );
  }

  instanceOfUserDetails(obj: IUserProfile): IUserProfile {
    return obj;
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
    this.spinner.show();
    this.auth.login(payload).subscribe(
      data => {
        console.log(data);
        this.spinner.hide();
        if (data.responseCode === '00') {
          localStorage.setItem('user', JSON.stringify(data.responseObject));
          this.auth.changeLoginState('true');
          this.toastr.success(`Welcome ${data.responseObject.emp_firstname} ${data.responseObject.emp_lastname}`, data.responseMessage);
          this.router.navigate(['/admin']);
        } else if (data.responseCode === '99') {
          this.loginError = {
                              status: true,
                              message: data.responseMessage
                            };
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
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
        } else if (error.status === 999) {
          this.toastr.error('Please check internet connection', error.error);
        } else {
          this.loginError = {
                              status: true,
                              message: error.error.error
                            };
          this.toastr.error('An Error Occured', 'Unsuccessful');
        }
        // this.toastr.error('An Error Occured', 'Unsuccessful');
      }
    );
  }

}

