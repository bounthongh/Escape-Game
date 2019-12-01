
import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { Reservate } from '../models/Reservate';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

  reservate: any;
  cols: any[];
  data: any;
  
  headElements = ["Acheteur", "Game", "Spectateur"];
  constructor(private ps: ApiService) { }

  ngOnInit() {
    
    this.ps
      .getAllBooking()
      .subscribe((data: Reservate[]) => {
        this.reservate = data;
        this.drawChart(data);
    });

    this.cols = [
      { field: 'Acheteur.Nom', header: 'Nom' },
      { field: 'Game.Nom', header: 'Jeux' },
      { field: 'Reservation.length', header: 'Nbr de joueur' }
  ];

  }
  drawChart(data: Reservate[]) {
    const Madame = [];
    const Monsieurs = [];
    data.forEach(element => {
      element.Reservation.forEach(item => {
        if(item['Spectateur'].Civilite === 'Madame') {
          Madame.push(item['Spectateur'].Civilite);
        } else {
          Monsieurs.push(item['Spectateur'].Civilite);
        }
      });
    });
    this.data = {
      labels: ['Madame','Monsieurs'],
      datasets: [
          {
              data: [Madame.length, Monsieurs.length],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };
  }



}