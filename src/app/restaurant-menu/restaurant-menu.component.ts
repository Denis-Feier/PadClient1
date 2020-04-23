import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../service/menu.service';
import {Product} from '../model/product.model';
import {Subscription} from 'rxjs';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {OrderItem} from '../model/orderItem.model';

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

  constructor(private menuService: MenuService) {}

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
    console.log(this.orderItems);
  }
}
