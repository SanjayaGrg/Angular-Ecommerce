import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProduct: undefined | product[];
  trendingProducts: undefined | product[];

  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.popularProduct().subscribe((data) => {
      console.warn(data)
      this.popularProduct = data
    })
    this.product.trendingProducts().subscribe((data) => [
      this.trendingProducts = data
    ])
  }

}
