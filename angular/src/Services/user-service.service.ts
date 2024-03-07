import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { resetUserPassword, User, LoginResponse, UserDetails } from '../Interfaces/userInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../Interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  [x: string]: any;
  apiUrl = "http://localhost:5000/users"

  constructor(private http:HttpClient) { }


  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, user).pipe(
      tap((result) => {
        
        const token = result.token;
       
        localStorage.setItem('token', token);
      })
    );
  }

  checkDetails(): Observable<User> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });

    // You should return an observable here
    return this.http.get<User>('http://localhost:5000/users/userDetails/', { headers });
  }

getUserDetails(){
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'token': token
  });

  return this.http.get<UserDetails[]>('http://localhost:3500/users/userDetails/', { headers });
}

  

// resetPassword(user: resetUserPassword): Observable<any> {
//   return this.http.post('http://localhost:5000/users/reset-password/', user);
// }

resetPassword(logins: resetUserPassword): Observable<any> {
  const resetData = { ...logins }; // Spread the properties of logins into resetData
  return this.http.put<{ message: string, error: string }>('http://localhost:5000/users/reset-password', resetData);
}


}
