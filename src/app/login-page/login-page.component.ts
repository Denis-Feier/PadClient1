import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {catchError, tap} from 'rxjs/operators';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isSignIn: boolean;
  error: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignIn = true;
  }

  switchMode() {
    this.isSignIn = !this.isSignIn;
  }

  onSignIn(signInForm: NgForm) {
    console.log(signInForm);
    this.authService.login();
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
            this.error = error.error.message;
            console.log(error.error.message);
          }
        );
      } else {
        this.error = 'Pass and re-pass must match';
      }
    } else {
      this.error = 'Pass must be 6 length or more';
    }
  }

  passwordMatch(signUpForm: NgForm): boolean {
    return signUpForm.value.password === signUpForm.value.password2;
  }
}
