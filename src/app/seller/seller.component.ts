import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  constructor(private seller: SellerService, private router: Router) { }
  goToPage = false;
  authError: string = '';

  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: SignUp): void {
    // console.warn(data)
    this.seller.userSignUp(data)
  }
  logIn(data: SignUp): void {
    this.authError = ""
    // console.warn(data)
    this.seller.userLogin(data)
    this.seller.isLogInError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is incorrect."
      }
    })

  }
  signUpSeller() {
    this.goToPage = false
  }
  logInSeller() {
    this.goToPage = true
  }

}
