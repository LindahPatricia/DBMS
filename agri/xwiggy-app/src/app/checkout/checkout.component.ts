import { Component, OnInit } from '@angular/core';
import { AppComponent, User } from "../app.component";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user: User = AppComponent.modelUser;
  
  // String and number values
  total: string | null = null;
  cardNumber: string = '';
  month: string = '';
  year: string = '';
  cvv: string = '';
  nameOnCard: string = '';

  // Validation boolean values, initialized as false
  cardNumberVal: boolean = false;
  monthVal: boolean = false;
  yearVal: boolean = false;
  cvvVal: boolean = false;
  nameOnCardVal: boolean = false;

  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Redirect to login if session is not found
    if (!sessionStorage.getItem("userData")) {
      this.router.navigate(['login']);
    }
    
    // Get the total amount from session storage
    this.total = sessionStorage.getItem('total');
  }

  // Validate card number
  validCard() {
    if (this.cardNumber.length === 0) {
      this.cardNumberVal = false;
    } else if (this.cardNumber.length > 0 && this.cardNumber.length < 16) {
      this.cardNumberVal = false;
    } else if (this.cardNumber.length === 16) {
      let matcher = new RegExp('^[0-9]{16}$');
      this.cardNumberVal = matcher.test(this.cardNumber);
    }
  }

  // Validate month
  validMonth() {
    const monthNum = Number(this.month);
    this.monthVal = monthNum >= 1 && monthNum <= 12;
    console.log("Month Validation: ", this.monthVal);
  }

  // Validate CVV
  validCvv() {
    const cvvNum = Number(this.cvv);
    this.cvvVal = cvvNum >= 100 && cvvNum <= 999;
  }

  // Validate name on the card
  validName() {
    this.nameOnCardVal = this.nameOnCard.length >= 4 && this.nameOnCard.length <= 10;
  }

  // Validate year
  validYear() {
    const yearNum = Number(this.year);
    this.yearVal = yearNum >= 19 && yearNum <= 99;
    console.log("Year Validation: ", this.yearVal);
  }

  // Update the database after all validations are correct
  changeDB(): void {
    if (this.cardNumberVal && this.monthVal && this.yearVal && this.cvvVal && this.nameOnCardVal) {
      const url = "http://localhost:8080/changeDB";
      this.http.get(url).subscribe(
        res => {
          console.log("Database updated successfully");
        },
        err => {
          alert('Failed to update the database');
        }
      );
    } else {
      this.message = '';
      if (!this.cardNumberVal) this.message += "Invalid Card Number\n";
      if (!this.monthVal) this.message += "Enter a valid Month\n";
      if (!this.yearVal) this.message += "Enter a valid Year\n";
      if (!this.cvvVal) this.message += "Enter a valid CVV\n";
      if (!this.nameOnCardVal) this.message += "Enter a valid Name on Card\n";

      alert(this.message);
      this.message = '';
      this.router.navigate(['checkout']);
    }
  }
}
