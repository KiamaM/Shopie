import { Injectable } from '@angular/core';
import { UserResponse, Users, ViewUsers, loginDetails, signUpDetails, updatedUser } from '../intefaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_KEY = 'currentUser';

  setUser(user: UserResponse): void {
    
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getStoredUser(): any {
    const storedUser = localStorage.getItem(this.USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  token = localStorage.getItem('token') as string;

  constructor(private http: HttpClient) { }
  

  storeUserDetails(){

  }
  signUpUser(sign_details: signUpDetails) {
    return this.http.post<{ users: Users[], message: string, error: string }>('http://localhost:4500/users/register', sign_details)
  }

  loginUser(user_details: loginDetails) {
    return this.http.post<{ message: string, token: string, role: string, error: string }>('http://localhost:4500/users/login', user_details)
  }

  readToken(token: string) {
    return this.http.get<{ info: { userID: string, firstName: string, lastName: string, email: string, role: string } }>('http://localhost:4500/users/checkdetails',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'token': token
        })
      }).pipe(tap(details => console.log(details)))
  }



  resetPassword(email: string, password: string): Observable<any> {
    const resetData = { email, password };
    {
      return this.http.put<{ message: string, error: string }>('http://localhost:4500/users/reset_pwd', resetData);
    }
  }

  getAllUsers() {
    return this.http.get<{ users: ViewUsers[], error: string }>(`http://localhost:4500/users`, {

    })
  }
  getOneUser(id: string) {
    return this.http.get<{ user: Users[] }>(`http://localhost:4500/users/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  deleteUser(id: string) {
    return this.http.delete(`http://localhost:4500/users/delete/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }

  updateUserDetails(id: string, details: updatedUser) {
    return this.http.put<{ message: string, error: string }>(`http://localhost:4500/users/update/{id}`, details, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': this.token
      })
    })
  }


}
