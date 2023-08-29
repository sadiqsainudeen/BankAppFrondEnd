import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactonsComponent } from './transactons/transactons.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [

  // Path for login
  {
    path:"", component:LoginComponent

  },
  // register path
  {
    path:'register' ,component:RegisterComponent

  },
  // dasjboard
  {
    path:'dashboard' ,component:DashboardComponent

  },
  // transaction
  {
    path:'transactions' ,component:TransactonsComponent

  },
  // transactionpagenotfound
  {
    path:'**' ,component:PagenotfoundComponent

  }
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
