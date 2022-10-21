import { User } from "firebase/auth";

export interface ICurrentUser extends User {
  password?: string;
  role?: string;
  status?: string;
  level?: number;
  createdAt?: string;
  fullname?: string;
  gender?: { value: string; label: string };
}
