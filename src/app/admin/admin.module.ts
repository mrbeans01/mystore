import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import  { HttpModule } from '@angular/http';

//router
import { AdminRoutingModule } from './admin.routing.module'

// services
import { ProductService } from '../services/product/product.service';
import { UserService } from  './services/User.service';
import { AuthInterceptor } from './services/AuthInterceptor.service';

// auth guard

import { AuthGuard } from './guard/auth.guard'
//components
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthenticationService } from './services/Authentication.service';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { DashComponent } from './dash/dash.component';
import { ReportComponent } from './report/report.component';





@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    HeaderComponent,
    DashComponent,
    ReportComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AdminRoutingModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    UserService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
