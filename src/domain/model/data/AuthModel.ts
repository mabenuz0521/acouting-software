export interface Token {
  token: string;
  user: UserAuth
}

export interface UserAuth {
  id?: string;
  email?: string;
  password?: string;
}
