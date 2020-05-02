import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {User} from '../model/user.model';
import {OrdersService} from '../service/orders.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  user: User;
  private picPathDefault: string;
  displayPic: string;
  subscriptionAuthService: Subscription;
  nrOfOrders: number;
  subscriptionNrOfOrders: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private ordersService: OrdersService) {}

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

    this.subscriptionNrOfOrders = this.ordersService.nrOfOrderItems()
      .subscribe(items => {
        this.nrOfOrders = items;
      })
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptionAuthService.unsubscribe();
    this.subscriptionNrOfOrders.unsubscribe();
  }
}
