import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { Reservate } from '../models/Reservate';


@Component({
  selector: 'app-reservationform',
  templateUrl: './reservationform.component.html',
  styleUrls: ['./reservationform.component.css']
})

export class ReservationformComponent implements OnInit {
  reservate: any;
  displayTable: boolean;
  availableHour = [];
  reservationForm: FormGroup;
  public cols: any[];
  Date: string;


  headElements = ["Acheteur", "Game", "Spectateur"];

  hourlist: any[];
  selectedHour: any;

  hourlist2: string[] = [
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
  rooms: any[];
  selectedRoom: any;
  day: Number;
  hourlistFinal: string[] = [];

  constructor(private router: Router, private ps: ApiService, private fb: FormBuilder) {
    this.ps
    .getAllBooking()
    .subscribe((data: Reservate[]) => {
      this.reservate = data;
      // this.drawChart(data);
  });
    this.createForm();
    //let today = new Date();
    //this.Date = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();
  }

createForm() {
  this.reservationForm = this.fb.group({
    ProductName: ['', Validators.required ],
    ProductDescription: ['', Validators.required ],
    ProductPrice: ['', Validators.required ]
  });
}
  ngOnInit() {
    this.rooms = [
      { label: 'Salle Baba 1', value: {name: 'Baba 1'} },
      { label: 'Salle bobo 2', value: {name: 'bobo 2'} },
      { label: 'Salle popo 3', value: {name: 'popo 3'} },
      { label: 'Salle koko4', value: {name: 'koko4'} }
    ];
    this.hourlist = [ {label: '08:00'}, {label: '10:00'},{label: '12:30'},{label: '16:00'} ,{label: '18:30'},{label: '21:30'},{label: '00:00'},{label: '03:00'},{label: '05:30'}];
    this.selectedRoom = this.rooms[1];
    this.cols = [
      { field: 'Acheteur.Nom', header: 'Nom' },
      { field: 'Game.Nom', header: 'Jeux' },
      { field: 'Reservation.length', header: 'Nbr de joueur' }
  ];
    this.displayTable = false;
  }
  showTable() {
    this.displayTable = true;
    this.generateTable();
  }

  test()
  {
    console.log('Hello Test');
  }
  generateTable() {
    console.log('HELLO FRIEND');
  }

  
}
