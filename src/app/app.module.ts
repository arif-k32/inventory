import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteComponent } from './route/route.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RegisterComponent } from './register/register.component';
import { LoginGuard } from './services/login.guard';
import { HttpClientModule } from '@angular/common/http';
import { DashboardGuard } from './services/dashboard.guard';
import { ProductsComponent } from './products/products.component';
import { ToastrModule } from 'ngx-toastr';
const approute:Routes=[
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[DashboardGuard]
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'products/:id',
    component:ProductsComponent
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
  
]


@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PagenotfoundComponent,
    RegisterComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(approute),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
