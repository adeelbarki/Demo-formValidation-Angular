import { Injectable } from '@angular/core';
import { IUser } from './user';

@Injectable()
export class UserService {
  getUsers(): IUser[] {
    return [
      {firstName: 'Hector', lastName: 'Silwa', phone: '0234123456', email: 'hector@xyz.com', confirmEmail: 'adeelbarki@gmail.com'},
      {firstName: 'John', lastName: 'Candy', phone: '03234566787', email: 'john@xyz.com', confirmEmail: 'bilalbarki@gmail.com'},
      {firstName: 'kelly', lastName: 'Case', phone: '02323456785', email: 'kelly@xyz.com', confirmEmail: 'harisbarki@gmail.com'},
    ];
  }
}
