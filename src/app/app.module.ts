import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationGetComponent } from './reservation-get/reservation-get.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
  declarations: [
    AppComponent,
    ReservationAddComponent,
    ReservationGetComponent,
    ReservationEditComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
