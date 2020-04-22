import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isSignIn: boolean;
  errorSignUp: string;
  errorSignIn: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isSignIn = true;
  }

  switchMode() {
    this.errorSignUp = null;
    this.errorSignIn = null;
    this.isSignIn = !this.isSignIn;
  }

  onSignIn(signInForm: NgForm) {
    console.log(signInForm);
    const username = signInForm.value.username;
    const password = signInForm.value.password;
    this.authService.login({
      username,
      password
    }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/main']);
    }, error => {
      const reqError = error.error.message;
      this.errorSignIn = reqError;
    });
  }

  onSignUp(signUpForm: NgForm) {
    const username = signUpForm.value.username;
    const password = signUpForm.value.password;
    const email = signUpForm.value.email;
    if (password.length >= 6) {
      if (this.passwordMatch(signUpForm)) {
        this.authService.signUp({
          username,
          email,
          password
        }).subscribe(
          value => console.log(value),
          error => {
            this.errorSignUp = error.error.message;
            console.log(error.error.message);
          }
        );
      } else {
        this.errorSignUp = 'Pass and re-pass must match';
      }
    } else {
      this.errorSignUp = 'Pass must be 6 length or more';
    }
  }

  private passwordMatch(signUpForm: NgForm): boolean {
    return signUpForm.value.password === signUpForm.value.password2;
  }
}
