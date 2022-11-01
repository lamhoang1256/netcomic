import { User } from "firebase/auth";

export interface IUser {
  id: string;
  avatar: string;
  email: string;
  role: string;
  follows: string[];
  status: string;
  score: number;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  fullname: string;
  gender: {
    value: string;
    label: string;
  };
}

export interface ICurrentUser extends User {
  avatar?: string;
  password?: string;
  role?: string;
  status?: string;
  score?: number;
  createdAt?: {
    nanoseconds: number;
    seconds: number;
  };
  fullname?: string;
  gender?: {
    value: string;
    label: string;
  };
}
