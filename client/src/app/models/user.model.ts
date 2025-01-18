// src/app/models/user.model.ts
import { Role } from './enums/role.enum';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  fullName: string;
  companyId?: string; // The company the user belongs to
}
