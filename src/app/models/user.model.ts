
export class User {
  email: String;
  is_authenticated: boolean;
}

export interface LoadUser {
  loading: boolean;
  data: User | null
}