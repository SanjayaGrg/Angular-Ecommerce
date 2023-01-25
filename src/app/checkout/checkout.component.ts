import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice: number | undefined
  orderCartData: Cart[] | undefined

  orderMessage: string | undefined
  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.orderCartData = result
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity) //this (+ item.price) converts item.price from string into number
        }

      })
      this.totalPrice = price + (price / 10) + 100 - (price / 20);
      console.warn(this.totalPrice)
    }
    )
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.orderCartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 800);

      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          // alert("order placed")
          this.orderMessage = "Your Order has been placed."
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMessage = undefined
          }, 3000);

        }
      })
    }


  }
}
