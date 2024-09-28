import { Component, OnInit } from '@angular/core';
import { cart, menu, Quantity } from "../menu/menu.component";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MenuServiceService } from "../menu-service.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-merchant-menu',
  templateUrl: './merchant-menu.component.html',
  styleUrls: ['./merchant-menu.component.css']
})
export class MerchantMenuComponent implements OnInit {
  model: menu[] = []; // Initialize to an empty array
  modalCart: cart = {
    quantity1: 0,
    quantity2: 0,
    quantity3: 0
  };
  values: Quantity[] = []; // Initialize as an empty array

  constructor(
    private http: HttpClient,
    private router: Router,
    private menuService: MenuServiceService,
    public _DomSanitizationService: DomSanitizer
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
    const url = "http://localhost:8080/addToCart";
    this.modalCart.quantity1 = this.values[0]?.quantity || 0; // Use optional chaining and default to 0
    this.modalCart.quantity2 = this.values[1]?.quantity || 0;
    this.modalCart.quantity3 = this.values[2]?.quantity || 0;

    this.http.post<number>(url, this.modalCart).subscribe(
      (res: number) => {
        this.ngOnInit(); // Refresh the component
      },
      (err: any) => {
        alert("Error adding items to cart");
      }
    );
  }
}
