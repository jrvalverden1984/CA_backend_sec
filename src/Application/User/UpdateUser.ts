import { IUserRepository } from '../../Domain/User/IUserRepository';
import { User } from '../../Domain/User/User';

export class UpdateUser {
  constructor(private repo: IUserRepository) {}
  execute(id: number, data: Omit<User, 'UserID'>) {
    return this.repo.update(id, data);
  }
}