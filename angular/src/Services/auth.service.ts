import { Injectable } from '@angular/core';
import { UserResponse, Users, loginDetails, signUpDetails } from '../Interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


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


  loginUser(user_details:UserResponse ){
    return this.http.post<{message:string, token:string, error:string}>('http://localhost:4500/users/login', user_details)
  }

  readToken(token:string){
    return this.http.get<{info:{user_id: string,first_name:string, last_name:string,email:string}}>('http://localhost:4500/users/checkdetails', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token':token
      })
    })
  }
}
