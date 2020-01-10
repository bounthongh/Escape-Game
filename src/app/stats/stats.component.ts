import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Reservate } from '../models/Reservate';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  reservate: any;
  cols: any[];
  data: any;
  vr: any;
  age: any;
  constructor(private ps: ApiService) { }

  ngOnInit() {
    this.ps
      .getAllBooking()
      .subscribe((data: Reservate[]) => {
        this.reservate = data;
        this.drawChart(data);
    });
  }

  drawChart(data: Reservate[]) {
    const Madame = [];
    const Monsieurs = [];
    let isVr = 0;
    let isnVr = 0;

    let mineurs = 0;
    let ado = 0;
    let daront = 0;
    let vieux = 0

    data.forEach(element => {
      element.Reservation.forEach(item => {
        if (!isNullOrUndefined(item['Spectateur'])) {
          if(item['Spectateur'].Civilite === 'Madame') {
            Madame.push(item['Spectateur'].Civilite);
          } else {
            Monsieurs.push(item['Spectateur'].Civilite);
          }
        }

        if (!isNullOrUndefined(item['Spectateur'].Age )) {
        if(item['Spectateur'].Age < 18) {
          mineurs = mineurs + 1;
        } else if (item['Spectateur'].Age >=18 && item['Spectateur'].Age <= 25) {
          ado = ado + 1;
        } else if (item['Spectateur'].Age >=25 && item['Spectateur'].Age <= 39) {
           daront = daront + 1;
        }else if (item['Spectateur'].Age > 40) {
           vieux = vieux + 1;
        }
      }

      });
      if(element['Game'].VR === 'Oui') {
        isVr = isVr + 1;
      } else {
        isnVr = isnVr + 1;
      }
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

      this.vr = {
            labels: ['OUI','NON'],
            datasets: [
                {
                    data: [isVr, isnVr],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ]
                }]
            };

            this.age = {
                      datasets: [{
                          data: [
                              mineurs,
                              ado,
                              daront,
                              vieux
                          ],
                          backgroundColor: [
                              "#FF6384",
                              "#4BC0C0",
                              "#FFCE56",
                              "#36A2EB"
                          ],
                          label: 'My dataset'
                      }],
                      labels: [
                          "moins de 18",
                          "18-25 ans",
                          "25-39 ans",
                          "40-54ans et plus de 55 ans"
                      ]
                  };
  }

}
