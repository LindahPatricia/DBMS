import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MenuServiceService } from "../menu-service.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  model: menu[] = []; // Initialize to an empty array
  values: Quantity[] = [];
  total: number = 0; // Initialize total to 0

  modalCart: cart = {
    quantity1: 0,
    quantity2: 0,
    quantity3: 0
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private menuService: MenuServiceService
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem("userData") === null) {
      this.router.navigate(['login']);
    }
    this.getItems();
  }

  clearLocal() {
    sessionStorage.clear();
  }

  getItems(): void {
    this.menuService.getItems().subscribe(
      (men: menu[]) => {
        this.model = men;
        this.values = this.model.map(() => new Quantity(0)); // Initialize quantities to 0
      },
      (err: any) => {
        console.error("Error fetching menu items", err);
        alert("Could not load menu items. Please try again later.");
      }
    );
  }

  getTotal(): void {
    console.log(this.values);
    const url = "http://localhost:8080/cart";
    
    // Update quantities in modalCart based on values
    this.modalCart.quantity1 = this.values[0]?.quantity || 0; // Use optional chaining and default to 0
    this.modalCart.quantity2 = this.values[1]?.quantity || 0;
    this.modalCart.quantity3 = this.values[2]?.quantity || 0;

    this.http.post<number>(url, this.modalCart).subscribe(
      (res: number) => {
        sessionStorage.setItem('total', res.toString());
        this.total = res;
      },
      (err: any) => {
        alert("Please select at least 1 item");
      }
    );
  }
}

// Interfaces and classes
export interface menu {
  id: string;
  item: string;
  price: number;
  quantity: number;
  url: string;
  formID: string;
  cartID: string;
}

export interface cart {
  quantity1: number;
  quantity2: number;
  quantity3: number;
}

export class Quantity {
  constructor(public quantity: number = 0) {} // Default to 0
}
