import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

export interface User {
  username: string;
  password: string;
  email: string;
  phone: number;
  firstname: string;
  lastname: string;
  address: string;
  merchant: any; // Adjust the type if you have a specific type for 'merchant'
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // Default modelUser structure
  modelUser: User = {
    username: '',
    password: '',
    email: '',
    phone: 0,
    firstname: '',
    lastname: '',
    address: '',
    merchant: null
  };

  constructor(private router: Router) { }

  ngOnInit() {
    // Redirect to login if no user data is stored in session storage
    if (!sessionStorage.getItem("userData")) {
      this.router.navigate(['login']);
      return;
    }

    // Retrieve user data from session storage and parse it to an object
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    // Populate the modelUser with the retrieved session data
    Object.assign(this.modelUser, userData);

    console.log(this.modelUser);  // For debugging purposes
  }

  // Clear session storage data
  clearLocal() {
    sessionStorage.clear();
    console.log("Session storage cleared");
  }
}
