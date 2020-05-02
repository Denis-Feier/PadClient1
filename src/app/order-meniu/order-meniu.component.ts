import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from '../service/orders.service';
import {OrderItem} from '../model/orderItem.model';
import {Subscription} from 'rxjs';
import {FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-order-meniu',
  templateUrl: './order-meniu.component.html',
  styleUrls: ['./order-meniu.component.css']
})
export class OrderMeniuComponent implements OnInit, OnDestroy {

  orderItems: OrderItem[];
  private ordersServiceSub: Subscription;
  totalPrice: number;
  allInputs = [];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.orderItems = this.ordersService.checkOrders();
    this.calculateTotalPrice();
    for (const poi of this.orderItems) {
      this.allInputs.push(
        poi.quantity
      );
    }
  }

  private calculateTotalPrice() {
    this.totalPrice = this.orderItems.map(item => item.quantity * item.product.price)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  onSubmit() {
    console.log(this.orderItems);
  }

  onUpdate(index: number) {
    this.orderItems[index].quantity = this.allInputs[index];
    console.log(this.allInputs);
    console.log(this.orderItems);
    this.calculateTotalPrice();
  }

  onDelete(i: number) {
    this.orderItems.splice(i, 1);
    this.allInputs.splice(i, 1);
    this.calculateTotalPrice();
    this.ordersService.updateNrOfOrderItems(this.orderItems.length);
  }

  ngOnDestroy() {
  }

}
