  // app-routing.module.ts

  import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { ReservationAddComponent } from './reservation-add/reservation-add.component';
  import { ReservationGetComponent } from './reservation-get/reservation-get.component';
  import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './register/register.component';
  import { HomeComponent } from './home/home.component';

  const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
      {
        path: 'reservation/create',
        component: ReservationAddComponent
      },
      {
        path: 'reservation/:id',
        component: ReservationGetComponent
      },
      {
        path: 'reservations',
        component: ReservationEditComponent
      },
      {
          path: 'login',
          component: LoginComponent
      },
      {
          path: 'register',
          component: RegisterComponent
      }
    ];

  @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
  })
  export class AppRoutingModule { }
