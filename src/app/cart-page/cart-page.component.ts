import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: Cart[] | undefined
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) {

  }
  ngOnInit(): void {
    this.loadDetails()
  }
  checkout() {
    this.router.navigate(['checkout'])
  }
  removeCart(cartId: number | undefined) {
    cartId && this.product.removeFromCart(cartId).subscribe((result) => {
      this.loadDetails();

    }
    )
  }
  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      console.warn(result);
      this.cartData = result
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity) //this (+ item.price) converts item.price from string into number
        }

      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 20;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 20);
      console.warn(this.priceSummary);

      if (!this.cartData.length) {
        this.router.navigate(['/'])
      }
    })
  }

}
