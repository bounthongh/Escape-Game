import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  events: string[] = [];
  angForm: FormGroup;
  value: Date;
  availableHour = [];
  selected = '';
  selectedValue: string;
  salles: string[];
  hourlist: string[] = [
    '08:00',
    '10:00',
    '12:30',
    '16:00',
    '18:30',
    '21:30',
    '00:00',
    '03:00',
    '05:30',
  ];
  

  


  day: Number;
  hourlistFinal: string[] = [];
  constructor(private fb: FormBuilder, private ps: ProductsService,
     private router: Router, public dialog: MatDialog, private apiService: ApiService) {
    this.createForm();
  }

  createForm() {
    this.salles = [
    'Salle Baba 1', 'Salle bobo 2', 'Salle popo 3', 'Salle koko4'
  ];
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required ],
      ProductDescription: ['', Validators.required ],
      ProductPrice: ['', Validators.required ]
    });
  }

  addProduct(ProductName, ProductDescription, ProductPrice) {
    this.ps.addProduct(ProductName, ProductDescription, ProductPrice).subscribe(res => {
      console.log('done');
      this.router.navigate(['home']);
    }, err => {
      console.log(err);
    }
    );
  }



  // push event click on dialog
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const day = new Date(event.value).getTime();
    this.day = day;
    this.apiService.getBookingByDay(day).subscribe(res => {
      this.hourlistFinal = [];
      const unavalable = Object.values(res);
      this.hourlist.forEach(element => {
        if (unavalable.indexOf(element) < 0) {
          this.hourlistFinal.push(element);
        }
      });
      console.log(this.hourlistFinal)
    }, err => {
      console.log(err)
    });
  }

  sendData(data: any) {
    console.log(data);
    const item = {
      "day": this.day,
      "hours": data
    }
    this.apiService.booking(item).subscribe(res => {
      console.log(res)
  }, err => {
    console.log(err)
  });

  }


  ngOnInit() {
  }

}
