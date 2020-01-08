
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManagerPriceComponent } from './manager-price/manager-price.component';
import { StatsComponent } from './stats/stats.component';
import { ReservationformComponent } from './reservationform/reservationform.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth-guard.service';

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
    component: ProductGetComponent, canActivate: [AuthGuard]
  },
  {
    path: 'price',
    component: ManagerPriceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'reservation',
    component: ReservationformComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
