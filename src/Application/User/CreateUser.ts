import { IUserRepository } from '../../Domain/User/IUserRepository';
import { User } from '../../Domain/User/User';

export class CreateUser {
  constructor(private repo: IUserRepository) {}
  execute(data: Omit<User, 'UserID'>) {
    return this.repo.create(data);
  }
}