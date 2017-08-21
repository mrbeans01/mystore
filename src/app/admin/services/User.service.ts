import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/User.model'

import { AuthenticationService } from './Authentication.service'


@Injectable()
export class  UserService {
  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  getAll(): Observable<User[]> {
    // let headers = new Headers({ 'x-access-token':this.authenticationService.token });
    // let options = new RequestOptions({ headers: headers });
   return this.http.get('/api/admin/users/');
 }
  getById(_id: string) : Observable<User> {
    return this.http.get('/api/admin/users/' + _id);
  }
}
