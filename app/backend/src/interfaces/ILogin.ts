export default interface Ilogin {
  login(email: string, password: string): Promise<string>
}

export interface UserPasswordHiden {
  id?: number;
  username: string;
  role: string;
  email: string;
}
