import { Injectable } from '@angular/core';
import { IUser } from './user';

@Injectable()
export class UserService {
  getUsers(): IUser[] {
    return [
      {firstName: 'Adeel', lastName: 'Barki', phone: '03104975185', email: 'adeelbarki@gmail.com', confirmEmail: 'adeelbarki@gmail.com'},
      {firstName: 'Bilal', lastName: 'Barki', phone: '03216865470', email: 'bilalbarki@gmail.com', confirmEmail: 'bilalbarki@gmail.com'},
      {firstName: 'Haris', lastName: 'Barki', phone: '031723456785', email: 'harisbarki@gmail.com', confirmEmail: 'harisbarki@gmail.com'},
    ];
  }
}
