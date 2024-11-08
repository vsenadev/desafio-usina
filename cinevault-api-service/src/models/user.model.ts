export interface IUser {
  photo: string;
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  photo?: string;
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export interface IUSerInformation {
  photo?: string;
  name?: string;
  email?: string;
}
