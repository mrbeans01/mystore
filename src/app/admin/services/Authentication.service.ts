import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {
  public token: string;
  constructor(private http: Http) {
    var token = JSON.parse(localStorage.getItem('currentUser'));
    this.token = token;
  }
  login(username: string, password: string) {
      return this.http.post('/api/admin/authenticate/' ,{ username: username, password: password })
        .map((response : any) => {
          const user = response.json();
          if (user && user.token) {
                  this.token = user.token;
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user.token));
                }
                return user;
        });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
