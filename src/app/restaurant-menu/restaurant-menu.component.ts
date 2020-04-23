import { Component, OnInit } from '@angular/core';
import {MenuService} from '../service/menu.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.getAllProducts().subscribe(value => {
      console.log(value);
    });
  }

}
