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

  Date: Date;
  Salle: string;
  Creneaux: string;
  JoueurMax: number;
  Vr: string;

  TableData: any;
  RowTableData: any;

  reservate: any;
  displayTable: boolean;
  availableHour = [];
  reservationForm: FormGroup;
  public cols: any[];
  
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
    /*this.ps
    .getAllBooking()
    .subscribe((data: Reservate[]) => {
      this.reservate = data;
      this.displayform = false;
  });*/
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
    this.TableData = null;
    this.RowTableData = null;
    this.rooms = [
      { label: 'Salle Baba 1', value: {name: 'Salle Baba 1', player: '7', vr: 'non'} },
      { label: 'Salle bobo 2', value: {name: 'Salle bobo 2', player: '2',  vr: 'non'} },
      { label: 'Salle popo 3', value: {name: 'Salle popo 3', player: '4',  vr: 'oui'} },
      { label: 'Salle koko4', value: {name: 'Salle koko4', player: '6',  vr: 'oui'} }
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
  choixSalle(event: any)
  {
    console.log(event.value.name);
    console.log(event.value.vr);
    console.log(event.value.player);
    this.Salle = event.value.name;
    this.JoueurMax = event.value.player;
    this.Vr = event.value.vr;
    this.generateTable();
  }

  choixDate(event: any)
  {
    console.log(event);
    this.Date = event;
    this.displayTable = true;
    this.generateTable();
  }

  showTable() {
    this.displayTable = true;
  }

  save(){
    //pousse la donné vers l'api
  }

  close(){
    this.displayform=false;
  }

  reservation(i) {
    this.displayform = true;
    console.log(i);
    this.RowTableData = this.TableData[i];
    //ouverture du form avec les données du tableaux
  }

  generateTable() {
    var newArray = [];
    for (let item of this.hourlist)
    {
      console.log('hello');
      newArray.push({date: this.Date, salle: this.Salle, creneaux: item.value, joueursMax: this.JoueurMax, vr: this.Vr});
    }
    console.log(newArray);
    this.TableData = newArray;
  }
}
