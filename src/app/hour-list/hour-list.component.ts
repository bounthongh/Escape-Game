import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-hour-list',
  templateUrl: './hour-list.component.html',
  styleUrls: ['./hour-list.component.css']
})
export class HourListComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  hourlist: string[] = ['13-14h', '14-15h', '16-17h', '18-19h', '20-21h'];

  sendData(data: any) {
    console.log(data);
  }


  ngOnInit() {
    console.log(this.data)
  }

}
