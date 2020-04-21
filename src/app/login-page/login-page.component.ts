import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isSignIn: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isSignIn = true;
  }

  switchMode() {
    this.isSignIn = !this.isSignIn;
  }

  onSignIn(signInForm: NgForm) {
    console.log(signInForm);
  }

  onSignUp(signUpForm: NgForm) {
    console.log(signUpForm);
    console.log(this.passwordMatch(signUpForm));
  }

  passwordMatch(signUpForm: NgForm): boolean {
    return signUpForm.value.password === signUpForm.value.password2;
  }
}
