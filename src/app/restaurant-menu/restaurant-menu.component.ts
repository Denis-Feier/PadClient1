import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../service/menu.service';
import {Product} from '../model/product.model';
import {Subscription} from 'rxjs';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {OrderItem} from '../model/orderItem.model';
import {OrdersService} from '../service/orders.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit, OnDestroy {

  products: Product[];
  getAllProductsSubscription: Subscription;
  allInputs = new FormArray([]);
  orderItems: OrderItem[] = [];

  constructor(private menuService: MenuService,
              private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getAllProductsSubscription = this.menuService.getAllProducts()
      .subscribe(resp => {
        console.log(resp);
        this.products = resp;
        for (const p of this.products) {
          this.allInputs.push(
             new FormControl(0)
          );
          const clone = Object.assign({}, p);
          this.orderItems.push({
            product: clone,
            quantity: 0
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.getAllProductsSubscription.unsubscribe();
  }

  onSubmit() {
    const v = this.allInputs.controls;
    for (let i = 0; i < v.length; i++) {
      this.orderItems[i].quantity = v[i].value;
    }
    this.allInputs.setValue(new Array<number>(v.length).fill(0));
    const noZero = this.orderItems.filter(item => item.quantity !== 0)
    this.ordersService.newOrder(noZero.slice());
  }

}
