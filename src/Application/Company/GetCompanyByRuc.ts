import { ICompanyRepository } from '../../Domain/Company/ICompanyRepository'

export class GetCompanyByRuc {
  constructor(private repo: ICompanyRepository) {}
  execute(ruc: string) {
    return this.repo.getByRuc(ruc)
  }
}