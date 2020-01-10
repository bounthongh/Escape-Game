import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Reservate } from '../models/Reservate';
import { DatePipe } from '@angular/common'
// import { SelectItem } from 'primeng/api/selectitem';
import { SelectItem, MenuItem } from 'primeng/primeng';
import { isNullOrUndefined } from 'util';
import { LabelOptions } from '@angular/material';

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
  Participants: any;
  reservate: any;
  displayTable: boolean;
  availableHour = [];
  reservationForm: FormGroup;
  public cols: any[];
  public minimumDate = new Date();
  public nbJoueurs = 0;
  public datatable: any[];
  public languages: MenuItem[];
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

  Civilite: SelectItem[];
  arrayPrenom: any[];
  arrayNom: any[];
  selectedHour: any;
  rooms: any[];
  game: any[];
  users: any[];
  selectedRoom: any;
  day: Number;
  Game:any;
  hourlistFinal: string[] = [];
  isVr: SelectItem[];
  allPrice: any;

  displayform: boolean = false;
  angForm: FormGroup;
  reservateur:any = {
    Nom: '',
    Prenom: '',
    Age: 0,
    Email: '',
    Civilite: ''
  }

  constructor(private router: Router, private ps: ApiService, private fb: FormBuilder, private apiService: ApiService) {

  this.apiService.getPrice().subscribe(res => {
    const data = Object.values(res)
    const price = [];
    const label = [];
    
    data.forEach(element => {
      price.push(element.price);
      label.push(element.tarif);
    });

    const pricesObject = price.map(value => ({'label': value, 'value': value}));
    const labelPricesObject = label.map(value => ({'label': value, 'value': value}));
    this.allPrice = { 
      'price': pricesObject,
      'label': labelPricesObject
    };
    err => {
      console.error(err);
    }
  })
}

  ngOnInit() {
    this.TableData = null;
    this.RowTableData = null;
    this.Participants = null;
    this.arrayPrenom = ['','','','','','',''];
    this.arrayNom = ['','','','','','',''];
    this.rooms = [
      { label: 'Mariage sans alcool', value: {name: 'Mariage sans alcool', player: '7', VR: 'NON'} },
      { label: 'Interminable attente chez le medecin', value: {name: 'Interminable attente chez le medecin', player: '2',  VR: 'NON'} },
      { label: 'Greve de la SNCF', value: {name: 'Greve de la SNCF', player: '4',  VR: 'OUI'} },
      { label: 'Plus de PQ dans les toilettes', value: {name: 'Plus de PQ dans les toilettes', player: '6',  VR: 'OUI'} }
    ];
    this.game = [
      { label: 'Mariage sans alcool', value: 'Mariage sans alcool'},
      { label: 'Interminable attente chez le medecin', value: 'Interminable attente chez le medecin'},
      { label: 'Greve de la SNCF', value: 'Greve de la SNCF'},
      { label: 'Plus de PQ dans les toilettes', value: 'Plus de PQ dans les toilettes'}
    ]
    this.languages = [];
    this.Civilite = [{label: '', value:''},{label: 'Monsieur', value:'Monsieur'}, {label: 'Madame', value:'Madame'}];
    /*this.hourlist = [ 
      {label: '08:00', value: '08:00'},
      {label: '10:00', value: '10:00'},
      {label: '12:30', value: '12:30'},
      {label: '16:00', value: '16:00'},
      {label: '18:30', value: '18:30'},
      {label: '21:30', value: '21:30'},
      {label: '00:00', value: '00:00'},
      {label: '03:00', value: '03:00'},
      {label: '05:30', value: '05:30'}];*/

      this.isVr = [
        {label: 'OUI', value: 'Yes'},
        {label: 'NON', value: 'No'},
      ]
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
  onAddUsers() {
    if (isNullOrUndefined(this.users)) {
      this.users = [];
    }
    if (this.users.length < this.JoueurMax) {
        this.users.push({
            nom: '',
            prenom: '',
            Civilite: 'Madame',
            Age: 0,
            tarif: ''
        });
      }
}
onDeleteTranslation(item: any, index: number) {
  this.users.splice(index, 1);
}
  onchangenbplayer(event: any)
  {
    this.nbJoueurs = event;
    this.users= [];
    console.log(this.nbJoueurs);
  }
  onchangeroom(event: any)
  {
    this.Salle = event;

    for(let x=0; x < this.rooms.length; x++)
    {
      if(this.rooms[x].value.name == this.Salle)
      {
        console.log(this.rooms[x].value.player);
        this.JoueurMax = this.rooms[x].value.player;
      }
    }
    this.users= [];
  }

  choixSalle(event: any)
  {
    this.Salle = event.value.name;
    this.JoueurMax = event.value.player;
    this.Vr = event.value.VR;
    this.generateTable();
  }

  choixDate(event: Date)
  {
    
    this.Date = event;
    const day = this.Date.getTime();
    this.apiService.getBookingByDay(day).subscribe(res => {
      this.hourlistFinal = [];
      const unavalable = Object.values(res);
      this.hourlist.forEach(element => {
        if (unavalable.indexOf(element) < 0) {
          this.hourlistFinal.push(element);
        }
      });
      this.generateTable();
    }, err => {
      console.log(err)
    });
    this.displayTable = true;
  }

  showTable(){
    this.displayTable = true;
  }

  arrayPlayer(n: number)
  {
    if(n > 2)
    {
      if(this.users && this.users.length > n)
      {
        this.users= [];
      }
      return [...Array(n - 1).keys()].map(i => i + 2);
    }
    else
    {
      if(this.users && this.users.length > n)
      {
        this.users= [];
      }
      return [...Array(1).keys()].map(i => i + 2);
    }
  }

  save(){
    //pousse la donné vers l'api

    console.log(this.RowTableData);
    const Spectateur = {"Spectateur": this.users };
    const value = {
      "Acheteur": this.reservateur,
      "Reservation": Spectateur,
      "Game": this.RowTableData
    }
    this.apiService.saveGameClient(value).subscribe(res => {
      console.log(res),
      err => {
        console.warn(err);
      }
    })
  }

  close(){
    this.displayform=false;
    this.users= [];
  }

  reservation(i) {
    this.displayform = true;
    this.RowTableData = this.TableData[i];
    //ouverture du form avec les données du tableaux
  }

  generateTable() {
    var newArray = [];
    this.hourlistFinal.forEach(element => {
    });
    for (let item of this.hourlistFinal)
    {
      newArray.push({date: this.Date.getTime(), Nom: this.Salle, Horaire: item, joueursMax: this.JoueurMax, VR: this.Vr});
    }
    this.TableData = newArray;
  }
}
