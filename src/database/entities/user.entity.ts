export class UserEntity {
  id: string;
  email: string;
  name: string;
  role: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
