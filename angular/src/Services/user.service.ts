import { Injectable } from '@angular/core';
// import { UserResponse, Users, ViewUsers, loginDetails, signUpDetails, updatedUser } from '../Interfaces/user.interface;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { UserResponse, Users, ViewUsers, loginDetails, resetUserPassword, signUpDetails, updatedUser } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // public getAuthUser(): any {
  //   return this.user;
  // }

  // public setUser(user: any): void {
  //   this.user = user;
  //   this.getAuthUser()
  // }
  // private user :UserResponse

  private readonly USER_KEY = 'currentUser';

  setUser(user: UserResponse): void {

    localStorage.setItem("currentUser", user.firstName);
  }

  getStoredUser(): any {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser 
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  token = localStorage.getItem('token') as string;

  constructor(private http: HttpClient) { }


  storeUserDetails() {

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

  // getUserDetails(token: string) {
  //   this.readToken(token).pipe(map(res => ({
  //     userID: res.info.userID,
  //     firstName: res.info.firstName,
  //     lastName: res.info.lastName,
  //     email: res.info.email,
  //     role: res.info.role
  //   }))).subscribe(
  //     {
  //       next: (info) => {
  //         console.log({ info });
  //         this.setUser(info);
  //       },
  //       error: error => {
  //         console.log("Error occurred : ", error);
  //       }
  //     }
  //   )
  // }

resetPassword(logins: resetUserPassword): Observable<any> {
  const resetData = { ...logins }; // Spread the properties of logins into resetData
  return this.http.put<{ message: string, error: string }>('http://localhost:4500/users/reset_pwd', resetData);
}

  getAllUsers() {
    return this.http.get<{ users: ViewUsers[], error: string }>(`http://localhost:4500/users`, {
      // headers: new HttpHeaders({
      //   'Content-type': 'application/json',
      //   // 'token': this.token
      // })
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