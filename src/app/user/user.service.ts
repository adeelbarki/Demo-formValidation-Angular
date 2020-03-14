import { Injectable } from '@angular/core';
import { IUser } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://ng-complete-guide-8744f.firebaseio.com/posts.json';
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
    }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service.');
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  updateUser(user: IUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${user}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
