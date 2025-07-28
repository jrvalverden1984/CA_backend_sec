import { ICompanyRepository } from '../../Domain/Company/ICompanyRepository'

export class DeleteCompany {
  constructor(private repo: ICompanyRepository) {}
  execute(id: number) {
    return this.repo.delete(id)
  }
}