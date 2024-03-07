import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUpDetails } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  registerUser(user_details:signUpDetails){
    return this.http.post<{message:string, error:string}>('http://localhost:4500/users/register', user_details)

  }}
