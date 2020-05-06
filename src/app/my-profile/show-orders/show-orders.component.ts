import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderDB} from '../../model/order-db.model';
import {OrdersService} from '../../service/orders.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit, OnDestroy {

  subscriptionGetOrders: Subscription;
  orderItems: OrderDB[];

  constructor(private ordersService: OrdersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.params.uid
    console.log(uid)
    this.subscriptionGetOrders = this.ordersService.getOrders(uid)
      .subscribe(items => {
        this.orderItems = items.reverse();
        console.log(this.orderItems);
      });
  }

  ngOnDestroy(): void {
    this.subscriptionGetOrders.unsubscribe();
  }

}
