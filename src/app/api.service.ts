import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://localhost:4000/';
  constructor(private http: HttpClient) { }

  getAllData(apiItem: String): any {
    console.log("unuse")
    // return this.http.get(this.baseURL+apiItem, {responseType: 'json'});
 }



  public booking(item) {
    const reservation = "reservation/add";
    return this.http.post(this.baseURL+reservation, item,{responseType: 'json'});
  }

  public getBooking() {
    const reservation = "reservation/";
    return this.http.get(this.baseURL+reservation, {responseType: 'json'});
  }

  public getAllBooking() {
    const reservation = "reservation/reservate";
    return this.http.get(this.baseURL+reservation, {responseType: 'json'});
  }

  public getBookingByDay(day: Number) {
    const reservation = "reservation/";
    return this.http.get(this.baseURL+reservation+day, {responseType: 'json'});
  }

}
