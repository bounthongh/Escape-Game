import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-manager-price',
  templateUrl: './manager-price.component.html',
  styleUrls: ['./manager-price.component.css']
})
export class ManagerPriceComponent implements OnInit {
  prices: any[];
  clonedPrices: { [s: string]: any; } = {};

  constructor(private ps: ApiService) { }

  ngOnInit() {
    this.ps
      .getPrice()
      .subscribe((data: any) => {
        this.prices = data;

    });
  }

  onRowEditInit(price: any) {
       this.clonedPrices[price.price] = {...price};
   }

   onRowEditSave(price: any) {
     console.log(price);
       if (price.newPrice > 0) {
           delete this.clonedPrices[price.price];
           console.log("ok")
           this.ps
             .updatePrice(price)
             .subscribe((data: any) => {
               //this.prices = data;
               console.log('oooo');
               // message service update call
           });
          // this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
       }
       else {
         console.log("ko")
        //   this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
       }
   }

   onRowEditCancel(price: any, index: number) {
       this.prices[index] = this.clonedPrices[price.price];
       delete this.clonedPrices[price.price];
   }

}
