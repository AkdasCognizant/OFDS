export interface User {
  userID: number;   // changed from string to number, and made required
  name: string;
  email: string;
  phone: number;
  password: string;
}
