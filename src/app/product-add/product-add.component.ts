import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HourListComponent } from '../hour-list/hour-list.component';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  events: string[] = [];
  angForm: FormGroup;
  value: Date;
  constructor(private fb: FormBuilder, private ps: ProductsService,
     private router: Router, public dialog: MatDialog) {
    this.createForm();
  }

  createForm() {
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
    this.openDialog(event.value);
  }

  // open dialog with data push
  openDialog(e): void {
    const dialogRef = this.dialog.open(HourListComponent, {
      width: '250px',
      data: { date: e }
    });

    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });*/
  }

  ngOnInit() {
  }

}
