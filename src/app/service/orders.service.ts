import { Injectable } from '@angular/core';
import {OrderItem} from '../model/orderItem.model';
import {Observable, Subject} from 'rxjs';
import {OrderPost} from '../model/orderPost.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OrderDB} from '../model/order-db.model';
import {Product} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  myOrders: OrderItem[];
  myOrderItemNr: Subject<number>;
  private apiUrl = environment.APIPrefix;
  constructor(private http: HttpClient) {
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

  onPostOrder(items: OrderItem[]) {
    const orderPosts: OrderPost[] = items.map(value => {
      const quantity = value.quantity;
      const pid = value.product.pid;
      const post: OrderPost = {
        quantity,
        pid
      }
      return post;
    });
    console.log(orderPosts);
    this.http.post(this.apiUrl + 'order/post', orderPosts).subscribe();

    this.deleteOrderItems();
  }

  private deleteOrderItems() {
    this.myOrders = [];
    this.myOrderItemNr.next(0);
  }

  getOrders(uid: number) {
    return this.http.get<OrderDB[]>(this.apiUrl + 'order/user/' + uid);
  }

  getProducts(pid: number) {
    return this.http.get<Product[]>(this.apiUrl + `order/${pid}/product`);
  }
}
