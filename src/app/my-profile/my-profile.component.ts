import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {

  user: User;
  private picPathDefault: string;
  displayPic: string;
  subscriptionAuthService: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.picPathDefault = 'assets/images/male-profile-picture-vector-1862205.jpg';
    this.subscriptionAuthService = this.authService.user
      .subscribe( user => {
        this.user = user;
        if (user.pic) {
          this.displayPic = user.pic;
        } else {
          this.displayPic = this.picPathDefault;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptionAuthService.unsubscribe();
  }

}
