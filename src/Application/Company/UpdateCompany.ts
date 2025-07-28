import { ICompanyRepository } from '../../Domain/Company/ICompanyRepository'
import { Company } from '../../Domain/Company/Company'

export class UpdateCompany {
  constructor(private repo: ICompanyRepository) {}
  execute(id: number, data: Omit<Company, 'CompanyID'>) {
    return this.repo.update(id, data)
  }
}