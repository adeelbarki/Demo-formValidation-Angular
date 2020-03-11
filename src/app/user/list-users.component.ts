import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [UserService]
})
export class ListUsersComponent implements OnInit {
  users: IUser[];

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.users = this._userService.getUsers();
    console.log(this.users);
  }

}
