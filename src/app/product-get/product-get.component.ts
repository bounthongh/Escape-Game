
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
  vr: any;
  age: any;
  show = false;
  jsonShow: any;

  headElements = ["Acheteur", "Game", "Spectateur"];
  constructor(private ps: ApiService) { }

  ngOnInit() {

    this.ps
      .getAllBooking()
      .subscribe((data: Reservate[]) => {
        this.reservate = data;
        // this.drawChart(data);
    });

    this.cols = [
      { field: 'Acheteur.Nom', header: 'Nom' },
      { field: 'Game.Nom', header: 'Jeux' },
      { field: 'Reservation.length', header: 'Nbr de joueur' }
  ];

  }

  exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.reservate);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "primengTable");
        });
    }

  showJson(i: number) {
    this.jsonShow = this.reservate[i];
     if(this.show === true) {
       this.show = false;
     } else {
       this.show = true;
     }
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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
        if(item['Spectateur'].Civilite === 'Madame') {
          Madame.push(item['Spectateur'].Civilite);
        } else {
          Monsieurs.push(item['Spectateur'].Civilite);
        }
        if(item['Spectateur'].Age < 18) {
          mineurs = mineurs + 1;
        } else if (item['Spectateur'].Age >=18 && item['Spectateur'].Age <= 25) {
          ado = ado + 1;
        } else if (item['Spectateur'].Age >=25 && item['Spectateur'].Age <= 39) {
           daront = daront + 1;
        }else if (item['Spectateur'].Age > 40) {
           vieux = vieux + 1;
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
