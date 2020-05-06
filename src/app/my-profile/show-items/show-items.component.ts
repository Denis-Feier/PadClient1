import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../../service/orders.service';
import {Subscription} from 'rxjs';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.css']
})
export class ShowItemsComponent implements OnInit, OnDestroy {

  subscriptionGetProducts: Subscription;
  products: Product[];

  constructor(private route: ActivatedRoute, private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    const oid = this.route.snapshot.params.oid;
    this.subscriptionGetProducts = this.ordersService.getProducts(oid)
      .subscribe(items => {
        console.log(items);
        this.products = items;
      });
  }

  ngOnDestroy(): void {
    this.subscriptionGetProducts.unsubscribe();
  }

}
