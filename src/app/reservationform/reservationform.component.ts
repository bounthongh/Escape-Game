import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-reservationform',
  templateUrl: './reservationform.component.html',
  styleUrls: ['./reservationform.component.css']
})
export class ReservationformComponent implements OnInit {
  displayTable: boolean;
  availableHour = [];
  reservationForm: FormGroup;

  hourlist: string[] = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
    '19:00-20:00',
  ];

  salles: string[] = [
    'Salle Baba 1', 'Salle bobo 2', 'Salle popo 3', 'Salle koko4'
  ];

  day: Number;
  hourlistFinal: string[] = [];

  constructor(private router: Router, public dialog: MatDialog, private apiService: ApiService, private fb: FormBuilder) {
    this.createForm();
}

createForm() {
  this.reservationForm = this.fb.group({
    ProductName: ['', Validators.required ],
    ProductDescription: ['', Validators.required ],
    ProductPrice: ['', Validators.required ]
  });
}
  ngOnInit() {
    this.displayTable = false;
  }
  showTable() {
    this.displayTable = true;
    this.generateTable();
  }

  generateTable() {

  }

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
    }, err => {
      console.log(err)
    });
  }


}
