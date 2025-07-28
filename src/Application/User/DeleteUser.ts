import { IUserRepository } from '../../Domain/User/IUserRepository';

export class DeleteUser {
  constructor(private repo: IUserRepository) {}
  execute(id: number) {
    return this.repo.delete(id);
  }
}