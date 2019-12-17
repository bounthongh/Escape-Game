// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManagerPriceComponent } from './manager-price/manager-price.component';
import { StatsComponent } from './stats/stats.component';
import { ReservationformComponent } from './reservationform/reservationform.component'
const routes: Routes = [

  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',
    component: HomePageComponent
  },
  {
    path: 'product/create',
    component: ProductAddComponent
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'products',
    component: ProductGetComponent
  },
  {
    path: 'price',
    component: ManagerPriceComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'reservation',
    component: ReservationformComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
