
import { Component, OnInit } from '@angular/core';

import { User } from '../models/User.model';
import { UserService } from '../services/User.service';

@Component({
  moduleId: module.id,
  styleUrls: ['./home.component.scss'],
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }


  private loadAllUsers() {
    this.userService.getAll().subscribe((users :User[]) => {
      this.users = users;
    console.log(users);
    });

    setTimeout(() =>{
      this.userService.getById('sdfsdfs').subscribe(res =>{
        console.log(res);
      });
    },5000);


  }
}
