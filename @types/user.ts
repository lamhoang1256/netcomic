import { User } from "firebase/auth";

export interface ICurrentUser extends User {
  password?: string;
  role?: string;
  status?: string;
  createdAt?: string;
}
