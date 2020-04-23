import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../service/menu.service';
import {Product} from '../model/product.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit, OnDestroy {

  products: Product[];
  getAllProductsSubscription: Subscription;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getAllProductsSubscription = this.menuService.getAllProducts()
      .subscribe(resp => {
        console.log(resp);
        this.products = resp;
      });
  }

  ngOnDestroy(): void {
    this.getAllProductsSubscription.unsubscribe();
  }

}
