import { Injectable } from '@angular/core';
import {OrderItem} from '../model/orderItem.model';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  myOrders: OrderItem[];
  myOrderItemNr: Subject<number>;
  constructor() {
    this.myOrders = [];
    this.myOrderItemNr = new Subject<number>();
  }

  newOrder(orderItems: OrderItem[]) {
    this.myOrders = orderItems;
    console.log(this.myOrders);
    this.myOrderItemNr.next(this.myOrders.length);
  }

  checkOrders() {
    return this.myOrders;
  }

  nrOfOrderItems(): Observable<number> {
    return this.myOrderItemNr;
  }

  updateNrOfOrderItems(nr: number) {
    this.myOrderItemNr.next(nr);
  }
}
