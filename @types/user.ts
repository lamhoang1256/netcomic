import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface ICurrentUser extends User {
  password?: string;
  role?: string;
  status?: string;
  score?: number;
  createdAt?: {
    nanoseconds: number;
    seconds: number;
  };
  fullname?: string;
  gender?: { value: string; label: string };
}
