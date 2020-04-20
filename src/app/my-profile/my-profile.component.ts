import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  private profilePic: string;

  ngOnInit(): void {
    this.profilePic = 'assets/images/male-profile-picture-vector-1862205.jpg';
  }

  getProfilePic(): string {
    return this.profilePic;
  }

}
