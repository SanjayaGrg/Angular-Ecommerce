import { Component } from '@angular/core';
import { Cart, LogIn, product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogIn: boolean = true
  authError: string = "";
  constructor(private user: UserService, private product: ProductService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    console.warn(data);
    this.user.userSignUp(data)
  }
  logIn(data: LogIn) {
    console.warn(data)
    this.user.userLogIn(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("apple", result);
      if (result) {
        this.authError = "Please enter valid user details."
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart()
        }, 500)
      }
    })

  }
  openLogIn() {
    this.showLogIn = true
  }
  openSignUp() {
    this.showLogIn = false
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data)

      cartDataList.forEach((product: product, index) => {
        let cardData: Cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cardData.id;
        setTimeout(() => {
          this.product.addToCart(cardData).subscribe((result) => {
            if (result) {
              console.warn("item stored in db: ");

            }
          })
        }, 500)
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);

  }


}
