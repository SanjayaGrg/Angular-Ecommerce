import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService, private goTo: Router) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.warn(productId)
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data)
      this.productData = data

    })

  }
  update(data: product) {
    console.warn(data)
    if (this.productData) {
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result) => {
      console.warn(result)
      if (result) {
        this.productMessage = "The product has updated."
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
      this.goTo.navigate(['seller-home']);
    }, 3000);
  }
}
