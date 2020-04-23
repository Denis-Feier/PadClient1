import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment.APIPrefix;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.apiUrl + 'product/all');
  }

}
