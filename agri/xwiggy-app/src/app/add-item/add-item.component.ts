import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  newFoodItems: foodItems = {
    id: '',
    name: '',
    price: 0,                  // Set default value for price
    quantityAvailable: 0,      // Set default value for quantityAvailable
    fileDataF: ''              // Set default value for fileDataF
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.length == 0)
      this.router.navigate(['welcome']);
  }

  url: string = null;
  selectedFile: File | null = null; // Declare selectedFile with File type

  onSubmit(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    formData.append('newFoodItem', JSON.stringify(this.newFoodItems));

    console.log(formData.get('file'));
    console.log(formData.get('newFoodItem'));

    this.url = this.selectedFile ? "http://localhost:8080/addNewItemUrl" : "http://localhost:8080/addNewItem";

    this.http.post(this.url, formData)
      .subscribe(
        res => {
          console.log(this.newFoodItems);
          alert("Item Added Successfully!");
        },
        err => {
          alert("Failed to add item. Please try after some time!");
        }
      )
  }

  onFileSelected(event: Event) { // Specify the type for event
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  present: boolean = false; // Set default to false

  checkAvailability() {
    this.http.post<boolean>("http://localhost:8080/checkItemId", this.newFoodItems.id)
      .subscribe(
        res => {
          this.present = res;
        },
        err => {
          alert("Error. Try after some time.");
        }
      )
  }

  clearLocal() {
    sessionStorage.clear();
  }
}

export interface foodItems {
  id: string;
  name: string;
  price: number;
  quantityAvailable: number;
  fileDataF: string;
}
