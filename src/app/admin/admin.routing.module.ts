import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path : 'home', component: HomeComponent , canActivate : [AuthGuard] ,
    children: [
      {
        path: '',
        component: DashComponent,
        outlet: 'content'
      },{
        path: 'report',
        component: ReportComponent,
        outlet: 'content'
      }]
   },
   { path : 'report', component: HomeComponent , canActivate : [AuthGuard] ,
     children: [
       {
         path: '',
         component: ReportComponent,
         outlet: 'content'
       }
     ]
  }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
