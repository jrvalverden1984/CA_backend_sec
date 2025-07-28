import { ICompanyRepository } from '../../Domain/Company/ICompanyRepository'

export class GetPaginatedCompany {
  constructor(private repo: ICompanyRepository) {}
  execute(page: number, limit: number) {
    return this.repo.getPaginated(page, limit)
  }
}