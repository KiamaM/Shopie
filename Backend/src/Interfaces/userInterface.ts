export interface User{
    userID:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}


export interface loginDetails{email:string;
    password:string}
  
    export interface ViewUsers {
        userID:string;
        firstName: string;
        lastName: string;
        email: string;
      }
export interface updatedUser{
    userID:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // role:string;
}

export interface signUpDetails{
    userID:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
