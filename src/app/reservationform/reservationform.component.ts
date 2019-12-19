import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public datatable: any[];

  headElements = ["Acheteur", "Game", "Spectateur"];

  hourlist: any[] = [
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
  selectedHour: any;
  rooms: any[];
  selectedRoom: any;
  day: Number;
  hourlistFinal: string[] = [];

  displayform: boolean = false;

  constructor(private router: Router, private ps: ApiService, private fb: FormBuilder) {
    this.ps
    .getAllBooking()
    .subscribe((data: Reservate[]) => {
      this.reservate = data;
      this.displayform = false;
      // this.drawChart(data);
  });
    //this.createForm();
    //let today = new Date();
    //this.Date = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();
 /* }

createForm() {
  this.reservationForm = this.fb.group({
    ProductName: ['', Validators.required ],
    ProductDescription: ['', Validators.required ],
    ProductPrice: ['', Validators.required ]
  });*/
}
  ngOnInit() {
    this.rooms = [
      { label: 'Salle Baba 1', value: {name: 'Baba 1', player: '7'} },
      { label: 'Salle bobo 2', value: {name: 'bobo 2', player: '2'} },
      { label: 'Salle popo 3', value: {name: 'popo 3', player: '4'} },
      { label: 'Salle koko4', value: {name: 'koko4', player: '6'} }
    ];

    this.hourlist = [ 
      {label: '08:00', value: '08:00'},
      {label: '10:00', value: '10:00'},
      {label: '12:30', value: '12:30'},
      {label: '16:00', value: '16:00'},
      {label: '18:30', value: '18:30'},
      {label: '21:30', value: '21:30'},
      {label: '00:00', value: '00:00'},
      {label: '03:00', value: '03:00'},
      {label: '05:30', value: '05:30'}];

    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'selectedrooms', header: 'Salle' },
      { field: 'horraire', header:'Creneaux'},
      { field: 'nb joueur', header: 'Joueurs Max' },
      { field: 'Vr', header: 'Vr' },
      { field: 'Action', header: 'Action' },
  ];
    this.displayTable = false;
  }
  showTable() {
    this.displayTable = true;
  }

  onChange()
  {
    this.datatable.push();
    console.log('hello');
  }

  selectedroom(event: any)
  {
    // renvois le nom de la salle avec le nombre de joueurs max
    console.log(event.data);
  }

  save(){
    //pousse la donné vers l'api
  }

  test()
  {
    this.displayform = true;
  }

  reservation(i) {
    //ouverture du form avec les données du tableaux
  }
}
