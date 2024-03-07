export interface User {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

  export interface LoginResponse {
    user: User | undefined;
    token: string;
    userID:string
    message?: string;
  }

  export interface userLogin {
    email: string,
    password : string
}

export interface UserDetails {
  userID:string;
  firstName: string;
  lastName: string;
  role:string;

}

export interface resetUserPassword {
  email: string;
  newPassword: string;
}

export interface updatedUserData {
  userID:string;
  firstName: string;
  lastName: string;
  email: string;
};


