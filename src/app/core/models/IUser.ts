export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IResetPayload {
  username: string;
  password: string;
  new_password: string;
}
