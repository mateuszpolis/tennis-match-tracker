export enum UserRole {
  BACKEND_ADMIN = "BACKEND_ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type User = {
  id: number;
  name: string;
  email: string;
  surname: string;
  role: UserRole;
  status: UserStatus;
};
