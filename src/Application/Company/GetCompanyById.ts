import { ICompanyRepository } from '../../Domain/Company/ICompanyRepository'

export class GetCompanyById {
  constructor(private repo: ICompanyRepository) {}
  execute(id: number) {
    return this.repo.getById(id)
  }
}