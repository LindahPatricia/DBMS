import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpringFood-app';

  // Static total value for the application
  static total: number = 0;

  // Static modelUser to hold user information
  static modelUser: User = {
    username: '',
    password: '',
    email: '',
    phone: 0,
    firstname: '',
    lastname: '',
    address: '',
    merchant: null
  };
}

// User interface defining the structure of the user object
export interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone: number;
  merchant: boolean | null; // 'merchant' can either be true, false, or null
}
