import { IUserRepository } from '../../Domain/User/IUserRepository';

export class GetPaginatedUser {
  constructor(private repo: IUserRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit);
  }
}